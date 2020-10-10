import React from "react";
import { SWRConfig } from "swr";
import fetch from "isomorphic-unfetch";

type Args = Parameters<typeof fetch>;

const baseURL = process.env.BASE_API_URL || "";

export async function fetcher<Data, Error = unknown>(
  ...args: Args
): Promise<{ data: Data | null; error: Error | null }> {
  try {
    const [path, ...params] = args;
    const res = await fetch(`${baseURL}${path}`, ...params);
    const data = (await res.json()) as Data;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export const SWRProvider: React.FC = ({ children }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
