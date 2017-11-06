import {observable} from 'mobx';
import {AsyncStorage} from 'react-native';

class Store {
  @observable feeds;
  @observable selectedFeed;
  @observable selectedEntry;

  constructor() {
    AsyncStorage.getItem('@feeds')
    .then((sFeeds)=>{
      this.feeds = JSON.parse(sFeeds) || [];
    });
  }

  _persistFeeds() {
    AsyncStorage.setItem('@feeds', JSON.stringify(this.feeds));
  }

  addFeed(url, feed) {
    this.feeds.push({ 
      url, 
      entry: feed.entry,
      title: feed.title,
      updated: feed.updated
    });
    this._persistFeeds();
  }

  removeFeed(url) {
    this.feeds = this.feeds.filter((f) => {
      return f.url !== url
    });
    this._persistFeeds();
  }

  selectFeed(feed) {
    this.selectedFeed = feed;
  }

  selectEntry(entry) {
    this.selectedEntry = entry;
  }
}


const store = new Store()
export default store