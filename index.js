import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import _db from './_db.js';

const resolvers = {
  Query: {
    games: () => _db.games,
    reviews: () => _db.reviews,
    authors: () => _db.authors,
    game: (parent, args) => {
      return _db.games.find((game) => game.id === args.id);
    },
    review: (parent, args) => {
      return _db.reviews.find((review) => review.id === args.id);
    },
    author: (parent, args) => {
      return _db.authors.find((author) => author.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: {
    origin: ['https://studio.apollographql.com'], // Allow Apollo Sandbox
    credentials: true, // Optional if using authentication
  },
});

console.log(`🚀 Server ready at: ${url}`);
