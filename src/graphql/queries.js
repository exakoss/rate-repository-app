import {gql} from 'apollo-boost'

export const GET_REPOSITORIES = gql`
    query Repositories ($orderBy:AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword){
            edges {
                node {
                    ownerAvatarUrl
                    reviewCount
                    stargazersCount
                    forksCount
                    ratingAverage
                    language
                    fullName
                    description
                    url
                    id
                }
            }
        }
    }
`

export const AUTHORIZED_USER = gql`
    query {
        authorizedUser {
            id
            username
        }
    }
`

export const SINGLE_REPOSITORY = gql`
    query singleRepository($id: ID!) {
        repository(id: $id) {
            ownerAvatarUrl
            reviewCount
            stargazersCount
            forksCount
            ratingAverage
            language
            fullName
            description
            url
            id
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`
