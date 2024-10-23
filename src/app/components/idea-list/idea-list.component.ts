import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
import { GameIdea } from 'src/app/models/GameIdea';
import { GameIdeaService } from 'src/app/services/game-idea.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {

  gameIdeals: GameIdea[] = []
  searchText: string = "";
  orderBy: string = "upvote";
  searchSubscription: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private gameIdeaService: GameIdeaService
  ) { }

  ngOnInit() {
    this.loadDataGameIdeals();
    this.searchSubscription
    .pipe(debounceTime(200))
    .subscribe(value=>{
      this.loadDataGameIdeals();
    })
  }

  loadDataGameIdeals() {
    this.gameIdeals = this.gameIdeaService.getIdealsByFiler(this.searchText, this.orderBy);
  }

  searchChange(){
    this.searchSubscription.next(this.searchText)
  }

  upVote(gameIdeal: GameIdea) {
    this.updateVote(gameIdeal, "upvote");
  }

  downVote(gameIdeal: GameIdea) {
    this.updateVote(gameIdeal, "downvote");
  }

  updateVote(gameIdeal: GameIdea, voteType: "upvote" | "downvote") {
    if (gameIdeal.userVote === voteType) {
      gameIdeal.userVote = null;
      if (voteType === "upvote") {
        gameIdeal.upvotes--;
      } else {
        gameIdeal.downvotes--;
      }
    } else {
      if (gameIdeal.userVote === "upvote") {
        gameIdeal.upvotes--;
      } else if (gameIdeal.userVote === "downvote") {
        gameIdeal.downvotes--;
      }
      gameIdeal.userVote = voteType;
      if (voteType === "upvote") {
        gameIdeal.upvotes++;
      } else {
        gameIdeal.downvotes++;
      }
    }
  }
}
