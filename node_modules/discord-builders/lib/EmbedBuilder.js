'use strict';

class EmbedBuilder {
  constructor(embedObject = { type: 'rich' }) {
    this.embedObject = embedObject;
  }

  setTitle(title) {
    this.embedObject.title = title;
    return this;
  }

  setDescription(description) {
    this.embedObject.description = description;
    return this;
  }

  setColor(color) {
    if (typeof color === 'string') {
      if (color.startsWith('#')) color = `0x${color.substring(1)}`;
      color = parseInt(color, 16);
    }
    this.embedObject.color = color;
    return this;
  }

  setFooter(footer) {
    this.embedObject.footer = footer;
    return this;
  }

  setTimestamp(timestamp = new Date().toISOString()) {
    this.embedObject.timestamp = timestamp;
    return this;
  }

  setThumbnail(thumbnail) {
    this.embedObject.thumbnail = thumbnail;
    return this;
  }

  setImage(image) {
    this.embedObject.image = image;
    return this;
  }

  setAuthor(author) {
    this.embedObject.author = author;
    return this;
  }

  setURL(url) {
    this.embedObject.url = url;
    return this;
  }

  setType(type) {
    this.embedObject.type = type;
    return this;
  }

  addField(name, value, inline = false) {
    if (!this.embedObject.fields) this.embedObject.fields = [];
    this.embedObject.fields.push({ name, value, inline });
    return this;
  }

  setProvider(name, url) {
    if (!this.embedObject.provider) this.embedObject.provider = {};
    this.embedObject.provider.name = name;
    this.embedObject.provider.url = url;
    return this;
  }

  setVideo(video) {
    this.embedObject.video = video;
    return this;
  }

  build() {
    return this.embedObject;
  }
}

module.exports = { EmbedBuilder };
