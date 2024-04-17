import json
import random
from hashlib import sha256
from flask import Flask, request, jsonify
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
import binascii
import os
import sys
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins='http://localhost:5173')

# Hardcoded values for p and g
p = 8027543306822782091516025281137505380127630417154748539650504757242758509501850148018242675587643872983476700763087709478487511802404983390045147982417703
g = 5

def generate_keys(pair_name):
    # Generate a new private/public key pair
    private_key = rsa.generate_private_key(
        backend=default_backend(),
        public_exponent=65537,
        key_size=2048
    )

    # Get the public key from the private key
    public_key = private_key.public_key()

    # Serialize the private key
    private_key_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ).decode('utf-8')

    # Serialize the public key
    public_key_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode('utf-8')

    # Save the private key to a file
    with open(f"{pair_name}_private_key.pem", "w") as private_key_file:
        private_key_file.write(private_key_pem)

    # Save the public key to a file
    with open(f"{pair_name}_public_key.pem", "w") as public_key_file:
        public_key_file.write(public_key_pem)


def encrypt_rsa(public_key_file, message):
    with open(public_key_file, "rb") as f:
        public_key = serialization.load_pem_public_key(
            f.read(),
            backend=default_backend()
        )

    encrypted = public_key.encrypt(
        message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return binascii.hexlify(encrypted).decode()

def decrypt_rsa(private_key_file, encrypted_message):
    with open(private_key_file, "rb") as f:
        private_key = serialization.load_pem_private_key(
            f.read(),
            password=None,
            backend=default_backend()
        )

    encrypted_bytes = binascii.unhexlify(encrypted_message)
    decrypted = private_key.decrypt(
        encrypted_bytes,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return decrypted

def encrypt_symmetric(key, message):
    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=default_backend())
    encryptor = cipher.encryptor()
    padded_message = message + (b' ' * (16 - (len(message) % 16)))
    encrypted_message = encryptor.update(padded_message) + encryptor.finalize()
    return binascii.hexlify(encrypted_message).decode()

def decrypt_symmetric(key, encrypted_message):
    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=default_backend())
    decryptor = cipher.decryptor()
    encrypted_bytes = binascii.unhexlify(encrypted_message)
    decrypted_message = decryptor.update(encrypted_bytes) + decryptor.finalize()
    return decrypted_message.rstrip()

def generate_signature(private_key_file, message):
    with open(private_key_file, "rb") as f:
        private_key = serialization.load_pem_private_key(
            f.read(),
            password=None,
            backend=default_backend()
        )

    # Create a digest of the message
    digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
    digest.update(message)
    message_hash = digest.finalize()

    # Sign the message hash
    signature = private_key.sign(
        message_hash,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )

    return binascii.hexlify(signature).decode()

def verify_signature(public_key_file, message, signature):
    with open(public_key_file, "rb") as f:
        public_key = serialization.load_pem_public_key(
            f.read(),
            backend=default_backend()
        )

    # Calculate the hash of the message
    digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
    digest.update(message)
    message_hash = digest.finalize()

    # Convert the signature from hexadecimal
    signature_bytes = binascii.unhexlify(signature)

    # Verify the signature
    try:
        public_key.verify(
            signature_bytes,
            message_hash,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return True
    except Exception as e:
        return False


@app.route('/generate-keys', methods=['POST'])
def generate_key_pair():
    data = request.json
    pair_name = data['pair_name']
    generate_keys(pair_name)
    return jsonify({'message': 'Key pair generated successfully'})

@app.route('/get-public-key', methods=['POST'])
def get_public_key():
    data = request.json
    pair_name = data['pair_name']
    return send_public_key(pair_name)

def send_public_key(pair_name):
    public_key_filename = f"{pair_name}_public_key.pem"

    if os.path.exists(public_key_filename):
        with open(public_key_filename, "r") as f:
            public_key_pem = f.read()
        return jsonify({'public_key': public_key_pem})
    else:
        return jsonify({'error': 'Public key not found'})

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    message = data['message'].encode()
    sender_pair_name = data['sender_pair_name']
    receiver_pair_name = data['receiver_pair_name']

    sender_private_key_file = f"{sender_pair_name}_private_key.pem"
    receiver_public_key_file = f"{receiver_pair_name}_public_key.pem"

    try:
        # Generate a random symmetric key
        symmetric_key = os.urandom(32)  # 32 bytes = 256 bits

        # Encrypt the symmetric key using RSA
        encrypted_symmetric_key = encrypt_rsa(receiver_public_key_file, symmetric_key)

        # Encrypt the message using the symmetric key (AES)
        encrypted_message = encrypt_symmetric(symmetric_key, message)

        # Generate a digital signature
        signature = generate_signature(sender_private_key_file, message)

        # Combine the encrypted symmetric key, encrypted message, and signature
        package = {
            'encrypted_symmetric_key': encrypted_symmetric_key,
            'encrypted_message': encrypted_message,
            'signature': signature
        }

        return jsonify(package)
    except FileNotFoundError:
        error_message = f"Key files not found."
        return jsonify({'error': 'Encryption failed', 'message': error_message}), 400
    except ValueError as e:
        error_message = str(e)
        return jsonify({'error': 'Encryption failed', 'message': error_message}), 400

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.json
    package = data['package']
    receiver_pair_name = data['receiver_pair_name']
    sender_pair_name = data['sender_pair_name']

    receiver_private_key_file = f"{receiver_pair_name}_private_key.pem"
    sender_public_key_file = f"{sender_pair_name}_public_key.pem"

    try:
        # Extract the encrypted symmetric key, encrypted message, and signature
        encrypted_symmetric_key = package['encrypted_symmetric_key']
        encrypted_message = package['encrypted_message']
        signature = package['signature']

        # Decrypt the symmetric key using RSA
        symmetric_key = decrypt_rsa(receiver_private_key_file, encrypted_symmetric_key)

        # Decrypt the message using the symmetric key (AES)
        decrypted_message = decrypt_symmetric(symmetric_key, encrypted_message)

        # Verify the signature
        if verify_signature(sender_public_key_file, decrypted_message, signature):
            return jsonify({'decrypted_message': decrypted_message.decode()})
        else:
            raise ValueError("Signature verification failed")
    except FileNotFoundError:
        error_message = f"Key files not found."
        return jsonify({'error': 'Decryption failed', 'message': error_message}), 400
    except ValueError as e:
        error_message = str(e)
        return jsonify({'error': 'Decryption failed', 'message': error_message}), 400

def hash_function(data, mod_value):
    hash_value = int(sha256(data.encode('utf-8')).hexdigest(), 16)
    return hash_value % mod_value

@app.route('/create_commitments', methods=['POST'])
def create_commitments():
    try:
        with open('X.json', 'r') as x_file:
            X = json.load(x_file)
        
        # Calculate commitments
        Y = [pow(g, x, p) for x in X]
        
        # Save the commitments to Y.json
        with open('Y.json', 'w') as y_file:
            json.dump(Y, y_file)
        
        return jsonify(Y)
    except FileNotFoundError:
        error_message = "File 'X.json' not found."
        return jsonify({'error': 'Commitments creation failed', 'message': error_message}), 400
    except json.JSONDecodeError as e:
        error_message = f"Invalid JSON format in 'X.json': {str(e)}"
        return jsonify({'error': 'Commitments creation failed', 'message': error_message}), 400
    except Exception as e:
        error_message = str(e)
        return jsonify({'error': 'Commitments creation failed', 'message': error_message}), 500

@app.route('/prover', methods=['POST'])
def prover():
    try:
        positions = request.json['positions']
        
        with open('X.json', 'r') as x_file:
            X = json.load(x_file)
        
        # Extract the requested positions from X
        requested_X = [X[pos] for pos in positions]
        
        # Generate Y_selected based on the requested X values
        Y_selected = [pow(g, x, p) for x in requested_X]
        
        # Calculate the claim c
        c = sum(requested_X)
        
        # Generate random numbers R and compute Rsum and set A
        R = [random.randint(1, p-1) for _ in requested_X]
        Rsum = sum(R)
        A = [pow(g, r, p) for r in R]
        
        # Compute the challenge hash e
        e = hash_function(str(Rsum) + str(Y_selected) + str(c), p)
        
        # Compute the response set S
        S = [(r + e * x) % p for r, x in zip(R, requested_X)]
        
        # Generate proof.json
        proof = {
            'c': c,
            'Rsum': Rsum,
            'A': A,
            'S': S
        }
        
        with open('proof.json', 'w') as proof_file:
            json.dump(proof, proof_file)
        
        return jsonify(proof)
    except FileNotFoundError:
        error_message = "File 'X.json' not found."
        return jsonify({'error': 'Proof generation failed', 'message': error_message}), 400
    except json.JSONDecodeError as e:
        error_message = f"Invalid JSON format in 'X.json': {str(e)}"
        return jsonify({'error': 'Proof generation failed', 'message': error_message}), 400
    except KeyError as e:
        error_message = f"Missing key in request JSON: {str(e)}"
        return jsonify({'error': 'Proof generation failed', 'message': error_message}), 400
    except Exception as e:
        error_message = str(e)
        return jsonify({'error': 'Proof generation failed', 'message': error_message}), 500

@app.route('/verifier', methods=['POST'])
def verifier():
    try:
        proof = json.loads(request.json['proof'])
        Y = request.json['Y_selected']
        
        # Recalculate the challenge hash e'
        e_prime = hash_function(str(proof['Rsum']) + str(Y) + str(proof['c']), p)
        
        # Verify the responses
        verification_passed = True
        for ai, si, yi in zip(proof['A'], proof['S'], Y):
            left_hand_side = pow(g, si, p)
            right_hand_side = (ai * pow(yi, e_prime, p)) % p
            if left_hand_side != right_hand_side:
                verification_passed = False
                break
        
        # Verify the claim c
        Rsum_plus_ec = (proof['Rsum'] + e_prime * proof['c']) % p
        sum_S = sum(proof['S']) % p
        if Rsum_plus_ec != sum_S:
            verification_passed = False
        
        return jsonify({'verification_passed': verification_passed})
    except KeyError as e:
        error_message = f"Missing key in request JSON: {str(e)}"
        return jsonify({'error': 'Verification failed', 'message': error_message}), 400
    except Exception as e:
        error_message = str(e)
        return jsonify({'error': 'Verification failed', 'message': error_message}), 500

if __name__ == '__main__':
    app.run()