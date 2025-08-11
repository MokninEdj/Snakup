import { CreateUserParams, SignInParams } from "@/types";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.moknine.snakup",
  databaseId: "688be26800181c60b090",
  userCollectionId: "689a396b002022c355d1",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);

export const database = new Databases(client);
export const avatars = new Avatars(client);

// Register new user
export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    if (!user) throw new Error("User not created");
    signIn({ email, password });
    const avatar = avatars.getInitialsURL(name);
    return database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        name,
        email,
        avatar,
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};

// Sign in user
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();
    if (!currentUser) throw new Error("User not found");
    const userData = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentUser.$id)]
    );
    return userData.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};
