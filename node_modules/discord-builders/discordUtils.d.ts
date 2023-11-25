export type EmbedFooter = {
  text: string;
  value: string;
  inline?: boolean;
};

export type EmbedImage = {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

export type EmbedThumbnail = EmbedImage;

export type EmbedVideo = EmbedImage;

export type EmbedProvider = {
  name?: string;
  url?: string;
};

export type EmbedAuthor = {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type EmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

export type Embed = {
  title?: string;
  type?: 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
};

export class EmbedBuilder {
  constructor(embedObject?: Embed);
  setTitle(title: string): this;
  setType(type: 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link'): this;
  setDescription(description: string): this;
  setURL(url: string): this;
  setTimestamp(timestamp: string): this;
  setColor(color: number): this;
  setFooter(footer: EmbedFooter): this;
  setImage(image: EmbedImage): this;
  setThumbnail(thumbnail: EmbedThumbnail): this;
  setVideo(video: EmbedVideo): this;
  setProvider(provider: EmbedProvider): this;
  setAuthor(author: EmbedAuthor): this;
  addField(field: EmbedField): this;
  build(): Embed;
}
