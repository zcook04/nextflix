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

    return response?.users?.length === 0
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