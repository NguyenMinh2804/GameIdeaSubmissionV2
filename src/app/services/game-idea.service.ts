import { Injectable } from '@angular/core';
import { GameIdea } from '../models/GameIdea';

@Injectable({
  providedIn: 'root'
})
export class GameIdeaService {

  private ideasKey: string = 'gameIdeas';

  constructor() { }

  getIdealsByFiler(searchText: string = "", orderBy: string = ""): GameIdea[] {
    let gameIdeas: GameIdea[] = this.getAllIdeas();
    if (searchText) {
      searchText = searchText.trim().toLocaleLowerCase();
      gameIdeas = gameIdeas.filter(x =>
        x.description?.toLocaleLowerCase().trim()?.includes(searchText)
      )
    }

    if (orderBy) {
      if (orderBy == "upvote")
        gameIdeas = gameIdeas.sort((a, b) => b.upvotes - a.upvotes)
      else if (orderBy == "upvoteDesc")
        gameIdeas = gameIdeas.sort((a, b) => a.upvotes - b.upvotes)
      else if (orderBy == "downvote")
        gameIdeas = gameIdeas.sort((a, b) => b.downvotes - a.downvotes)
      else if (orderBy == "downvoteDesc")
        gameIdeas = gameIdeas.sort((a, b) => a.downvotes - b.downvotes)
    }

    return gameIdeas;
  }

  getAllIdeas(): GameIdea[] {
    const gameIdeas = localStorage.getItem(this.ideasKey);
    return gameIdeas ? JSON.parse(gameIdeas) : [];
  }

  saveIdeas(gameIdeas: GameIdea[]) {
    localStorage.setItem(this.ideasKey, JSON.stringify(gameIdeas));
  }

  addIdea(gameIdea: GameIdea) {
    const ideas = this.getAllIdeas();
    ideas.push(gameIdea);
    this.saveIdeas(ideas);
  }

  updateIdeal(gameIdea: GameIdea) {
    const ideas = this.getAllIdeas();
    const index = ideas.findIndex(x => x.id == gameIdea.id);
    ideas.splice(index, 1, gameIdea);
    this.saveIdeas(ideas);
  }

  uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
}
