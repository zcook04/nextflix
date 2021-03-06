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

export async function addStatsOne(token, userId, videoId) {
    const operationsDoc = `
    mutation addStatsOne($userId: String!, $videoId: String!) {
        insert_stats_one(object: {favorited: 0, userId: $userId, videoId: $videoId, watched: true}) {
        favorited
        id
        userId
        videoId
        watched
        }
    }
`;

    const response = await fetchGraphQL(operationsDoc, "addStatsOne", { userId, videoId }, token)
    return response
}

export async function updateStatsOne(token, { userId, videoId, watched, favorited }) {
    const operationsDoc = `
    mutation updateStatsOne($favorited: Int!, $userId: String!, $videoId: String!, $watched: Boolean) {
        update_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, 
            _set: {watched: $watched, favorited: $favorited}) {
          affected_rows
        }
      }
    `
    const response = await fetchGraphQL(operationsDoc, "updateStatsOne", { userId, videoId, watched, favorited }, token)
    return response
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
    return response?.data?.insert_stats_one
}

export async function findVideoByIssuer(issuer, videoId, token) {
    const operationsDoc = `
    query findVideoByIssuer($issuer: String!, $videoId: String!) {
        stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}) {
            watched
            favorited
            id
            userId
            videoId
        }
        }
    `;

    const response = await fetchGraphQL(operationsDoc, "findVideoByIssuer", { issuer, videoId }, token)
    return response?.data?.stats;
}

export async function getWatchedVideos(issuer, token) {
    const operationsDoc = `
    query getWatchedVideos ($issuer: String!){
      stats(where: {watched: {_eq: true}, userId: {_eq: $issuer}}) {
        videoId
      }
    }
  `;

    const response = await fetchGraphQL(operationsDoc, "getWatchedVideos", { issuer }, token)
    return response?.data?.stats;
}

export async function fetchMyListVideos(issuer, token) {

    const operationsDoc = `
    query getMyListVideos($issuer: String!) {
        stats(where: {favorited: {_eq: 1}, userId: {_eq: $issuer}}) {
          userId
          videoId
          favorited
        }
      }`

    const response = await fetchGraphQL(operationsDoc, "getMyListVideos", { issuer }, token)
    return response?.data?.stats;
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