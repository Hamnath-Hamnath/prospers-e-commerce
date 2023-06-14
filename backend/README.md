###BACKEND
For Hashing the password we used here for "bcryptjs".
The two most widely used hashing algorithms are Crypto-Js and bcryptjs.

Crypto-js and bcrypt are both encryption libraries used in software development, but they serve different purposes.

Crypto-js is a JavaScript library that provides a set of cryptographic algorithms for encrypting and decrypting data. It can be used to encrypt data for secure storage or transmission. It supports a wide range of encryption algorithms, including AES, DES, and SHA-256.

On the other hand, bcrypt is a password hashing function designed for password storage. It is specifically designed to make it difficult to perform password cracking attacks, by slowing down the hashing process. Bcrypt uses a salt to create a unique hash for each password, making it harder to crack passwords using a pre-computed hash table.

In general, bcrypt is recommended for password hashing and storage, while Crypto-js is recommended for general encryption needs. It is important to note that while bcrypt is considered secure for password storage, it is not suitable for encrypting other types of data. For encryption purposes, other algorithms like AES should be used.

The Data Schemas are located in the Model folder. Mongoose was used for schemas.

Colors npm module is used to color the console.

@access - Public ==> Contrary to this, some routes require an access-token, such as when purchasing a product and requiring a specific user-id.