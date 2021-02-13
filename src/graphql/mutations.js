import {gql} from 'apollo-boost'

export const AUTHORIZE = gql`
    mutation Authorize($credentials: AuthorizeInput!) {
        authorize(credentials: $credentials) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput!) {
        createReview(review: $review) {
            repositoryId
            text
            rating
            user {
                username
                reviewCount
            }
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(user: $user) {
            username
            createdAt
        }
    }
`
