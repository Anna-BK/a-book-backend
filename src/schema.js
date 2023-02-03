import path from 'path';
import url from 'url';

const __dirname = path.resolve();

import { loadFilesSync, loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

//https://github.com/ardatan/graphql-tools/issues/1750#issuecomment-655828240

const loadedTypes = await loadFiles(`${__dirname}/**/*.typeDefs.js`, {
    ignoreIndex: true,
    requireMethod: async (path) => {
      return await import(url.pathToFileURL(path));
    },
});
const loadedResolvers = await loadFiles(`${__dirname}/**/*.resolvers.js`, {
    ignoreIndex: true,
    requireMethod: async (path) => {
      return await import(url.pathToFileURL(path));
    },
});

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);