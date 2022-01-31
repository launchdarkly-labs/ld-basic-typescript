import * as LaunchDarkly from "launchdarkly-node-server-sdk";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

let ldClient: LaunchDarkly.LDClient;

async function getClient(): Promise<any> {
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
  await client.waitForInitialization();
  return client;
}

async function getFlagValue(
  key: string,
  user: LaunchDarkly.LDUser,
  defaultValue: any = false
): Promise<any> {
  let flagValue: LaunchDarkly.LDFlagValue;
  if (!ldClient) ldClient = await getClient();
  if (!user) {
    user = {
      key: "anonymous",
    };
  }
  flagValue = await ldClient.variation(key, user, defaultValue);
  return flagValue;
}

async function getUsername(): Promise<any> {
  const username: string = await getFlagValue("featured-username", null);
  console.log(username);
}

getUsername();
