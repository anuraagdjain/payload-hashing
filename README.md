# Payload Hashing

The purpose of this project is to help generating a hash which can be used as a key when aiming to cache API response.
This library handles object which can consist of array, multi-level nested structures and ensures the generated hash is
same always irrespective of the change in the order of data esp in the array. It can be used in the backend and also in the frontend
for example with SWR to generate a key which can be used to cache the request.


Author: [Anuraag Jain](https://adja.in)