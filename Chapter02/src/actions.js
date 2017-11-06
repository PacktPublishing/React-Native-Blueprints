import store from './store';
import xml2json from 'simple-xml2json';

export async function fetchFeed(url) {
  const response = await fetch(url);
  const xml = await response.text();
  let json = xml2json.parser(xml);
  return {
    entry: (json.feed && json.feed.entry) || (json.rss && json.rss.channel.item),
    title: (json.feed && json.feed.title) || (json.rss && json.rss.channel.title),
    updated: (json.feed && json.feed.updated) || null
  }
}

export function selectFeed(feed) {
  store.selectFeed(feed);
}

export function selectEntry(entry) {
  store.selectEntry(entry); 
}

export function addFeed(url, feed) {
  store.addFeed(url, feed);
}

export function removeFeed(url) {
  store.removeFeed(url);
}
