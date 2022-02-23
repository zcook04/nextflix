export async function isNewUser(token, issuer) {
    const operationsDoc = `
    query isNewUser($issuer: String!) {
        users(where: {issuer: {_eq: $issuer }}) {
        id
        email
        issuer
        }
    }
    `;

    const response = await fetchGraphQL(operationsDoc, "isNewUser", { issuer }, token)
    return response?.data?.users?.length === 0
}

export async function createNewUser(metadata, token) {
    const { issuer, email, publicAddress } = metadata
    const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
        insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
        returning {
            email
            id
            issuer
        }
        }
    }
    `;

    const response = await fetchGraphQL(operationsDoc, "createNewUser", { issuer, email, publicAddress }, token)
    return response
}

export async function fetchGraphQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}