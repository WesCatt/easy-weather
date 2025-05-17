"use server"

import {SignJWT, importPKCS8} from "jose";

const myPrivateKey = `-----BEGIN PRIVATE KEY-----
    MC4CAQAwBQYDK2VwBCIEIKym47ewfPNnuUHulFrdkDw49VIswusp+9nIkagd6I3U
    -----END PRIVATE KEY-----`;

export async function getToken() {
    return new Promise((resolve) => importPKCS8(myPrivateKey, "EdDSA").then(privateKey => {
        const customHeader = {
            alg: "EdDSA",
            kid: "K85DF9RNUA",
        }
        const iat = Math.floor(Date.now() / 1000) - 30;
        const exp = iat + 900;
        const customPayload = {
            sub: "442J3F77RE",
            iat,
            exp,
        }
        new SignJWT(customPayload).setProtectedHeader(customHeader).sign(privateKey).then(token => {
            resolve(token);
        }).catch(error => console.error(error));
    }));
}