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
  Game: {
    reviews: (parent) => {
      return _db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      return _db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game: (parent) => {
      return _db.games.find((game) => game.id === parent.game_id);
    },
    author: (parent) => {
      return _db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    createGame: (parent, args) => {
      const newGame = {
        id: _db.games.length + 1,
        title: args.title,
        platform: args.platform,
      };
      _db.games.push(newGame);
      return newGame;
    },
    deleteGame: (parent, args) => {
      const deletedGame = _db.games.find((game) => game.id === args.id);
      _db.games = _db.games.filter((game) => game.id !== args.id);
      return deletedGame;
    },
    updateGame: (parent, args) => {
      const updatedGame = _db.games.find((game) => game.id === args.id);
      updatedGame.title = args.title;
      updatedGame.platform = args.platform;
      return updatedGame;
    },
    createReview: (parent, args) => {
      const newReview = {
        id: _db.reviews.length + 1,
        rating: args.rating,
        content: args.content,
        author_id: args.author_id,
        game_id: args.game_id,
      };
      _db.reviews.push(newReview);
      return newReview;
    },
    deleteReview: (parent, args) => {
      const deletedReview = _db.reviews.find((review) => review.id === args.id);
      _db.reviews = _db.reviews.filter((review) => review.id !== args.id);
      return deletedReview;
    },
    updateReview: (parent, args) => {
      const updatedReview = _db.reviews.find((review) => review.id === args.id);
      updatedReview.rating = args.rating;
      updatedReview.content = args.content;
      updatedReview.author_id = args.author_id;
      updatedReview.game_id = args.game_id;
      return updatedReview;
    },
    createAuthor: (parent, args) => {
      const newAuthor = {
        id: _db.authors.length + 1,
        name: args.name,
        verified: args.verified,
      };
      _db.authors.push(newAuthor);
      return newAuthor;
    },
    deleteAuthor: (parent, args) => {
      const deletedAuthor = _db.authors.find((author) => author.id === args.id);
      _db.authors = _db.authors.filter((author) => author.id !== args.id);
      return deletedAuthor;
    },
    updateAuthor: (parent, args) => {
      const updatedAuthor = _db.authors.map((author) => {
        if (author.id === args.id) {
          console.log({ ...author, ...args });
          return {
            ...author,
            name: args.name,
            verified: args.verified,
          }
        } else {
          return author
        }
      });

      _db.authors = updatedAuthor;

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
