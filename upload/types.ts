export interface Collection {
  hexadecimal_color: string;
  name: string;
  total_files: number;
  recent_files: Array<{
    filename: string;
  }>;
}

export type Data = {
  data: {
    collections: Array<Collection>;
    success: boolean;
  };
};

export type ResponseError = {
  success: boolean;
  msg: string;
};

export type Files = Array<{
  fileName: string;
  file: File;
  collection: {
    value: string;
    label: string;
  };
}>;

export type SignedURLResponse = {
  metadata_header: {
    "x-goog-meta-collection": string;
  };
  signed_url: string;
};

export type SignedUrl = { signedUrl: string; file: File; header: string };
