export interface Watch {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
}

export interface Collection {
  name: string;
  description: string;
  watches: Watch[];
}
