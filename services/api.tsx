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
    const [options] = params;
    const res = await fetch(`${baseURL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = (await res.json()) as Data;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export const SWRProvider: React.FC = ({ children }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
