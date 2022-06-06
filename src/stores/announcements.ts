import { observable, action, computed, makeObservable, runInAction } from 'mobx'
import axios, { AxiosInstance } from 'axios'
//import { Firebase } from '../firebaseInit'

import { userStore } from '../stores/user'

export class AnnouncementStore {
  announcements: any = null
  isVisible: boolean = false
  loaded: boolean = false
  lastSeenAnnouncementId: number = 0

  private airtableAxiosClient: AxiosInstance | null = null

  constructor() {
    this.airtableAxiosClient = axios.create({
      baseURL: 'https://api.airtable.com/v0/',
      timeout: 30 * 1000,
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` }
    })
    makeObservable(this, {
      announcements: observable,
      isVisible: observable,
      loaded: observable,
      lastSeenAnnouncementId: observable,
      updateLastSeenAnnouncenmentId: action.bound,
      loadAnnouncements: action.bound,
      setVisible: action.bound,
      nextToBeShownIndex: computed,
      lastSeenAnnouncenmentIndex: computed
    })

    // show announcnments to only coach

    if (userStore.role == 'coach') {
      this.loadAnnouncements()
    }
  }

  updateLastSeenAnnouncenmentId(id: number) {
    if (id > this.lastSeenAnnouncementId) {
      this.lastSeenAnnouncementId = id
      //todo
      /*
      Firebase.firestore()
        .collection('settings')
        .doc(userStore.uuid)
        .set({
          lastSeenAnnouncementId: id
        })
        */
    }
  }

  getAirtableAxiosClient() {
    return this.airtableAxiosClient
  }

  async loadAnnouncements() {
    var settings: any = {data : ()=>{
      return {
        lastSeenAnnouncementId: "xyz"
      }
    }}
    //TODO
    /*
    settings = await Firebase.firestore()
      .collection('settings')
      .doc(userStore.uuid)
      .get()
      */

    if (settings!.data().lastSeenAnnouncementId) {
      this.lastSeenAnnouncementId = settings!.data().lastSeenAnnouncementId
    }

    try {
      const announcements = await this.getAirtableAxiosClient()!.get(
        '/appjA1rVokzT0KneN/announcements/'
      )

      runInAction(()=>{
        this.announcements = announcements.data.records.sort(
          (one: any, two: any) => one.fields.id - two.fields.id
        )
  
        this.loaded = true
      })

      // auto show annoucenments when last seen id is less then max id in announcenments
      const lastOne = this.announcements[this.announcements.length - 1]

      if (this.lastSeenAnnouncementId < lastOne.fields.id) {
        this.setVisible(true)
      }

      return this.announcements
    } catch (e) {
      return false
    }
  }

  setVisible(isVisible: boolean) {
    this.isVisible = isVisible
  }

  get nextToBeShownIndex() {
    if (this.lastSeenAnnouncenmentIndex == -1) {
      return 0
    }

    if (this.lastSeenAnnouncenmentIndex + 1 < this.announcements.length) {
      return this.lastSeenAnnouncenmentIndex + 1
    } else {
      return this.lastSeenAnnouncenmentIndex
    }
  }
  
  get lastSeenAnnouncenmentIndex() {
    return this.announcements!.findIndex(
      (i: any) => i.fields.id == this.lastSeenAnnouncementId
    )
  }
}

export const announcementStore = new AnnouncementStore()
