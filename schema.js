export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    game(id: ID!) : Game
    reviews: [Review]
    review(id: ID!) : Review
    authors: [Author]
    author(id: ID!) : Author
  }
  type Mutation {
    createGame(title: String!, platform: [String!]!): Game
    createReview(rating: Int!, content: String!, author_id: ID!, game_id: ID!): Review
    createAuthor(name: String!, verified: Boolean!): Author
    updateGame(id: ID!, title: String!, platform: [String!]!): Game
    updateReview(id: ID!, rating: Int!, content: String!, author_id: ID!, game_id: ID!): Review
    updateAuthor(id: ID!, name: String!, verified: Boolean!): Author
    deleteGame(id: ID!): Game
    deleteReview(id: ID!): Review
    deleteAuthor(id: ID!): Author
  }
`

//int float string boolean ID these are the basic types in graphql