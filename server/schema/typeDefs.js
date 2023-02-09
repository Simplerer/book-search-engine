const {} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID,
        user: User
    }

    type Query {
        getSingleUser(id: ID, username: String): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String || email: String ): Auth
        saveBook(username: String!, book: String!): User
        deleteBook(username: String!, book: String! ): User

    }
`

module.exports = typeDefs;