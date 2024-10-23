import { Component, ViewChild } from '@angular/core';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { GameIdea } from './models/GameIdea';
import { GameIdeaService } from './services/game-idea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameIdeaSubmission';

  @ViewChild(IdeaListComponent) ideaListComponent!: IdeaListComponent;

  constructor(
    private gameIdeaService: GameIdeaService
  ) {
    if (this.gameIdeaService.getAllIdeas().length == 0) {
      const gameIdeas: GameIdea[] = [
        {
          id: this.gameIdeaService.uuidv4(),
          description: "A puzzle-platformer where players can manipulate time to solve complex puzzles.",
          upvotes: 45,
          downvotes: 2,
          userVote: null,
          dateCreated: new Date('2024-10-01')
        },
        {
          id: this.gameIdeaService.uuidv4(),
          description: "An open-world RPG set in a futuristic city where players can hack into systems to alter the environment.",
          upvotes: 120,
          downvotes: 10,
          userVote: "upvote",
          dateCreated: new Date('2024-09-25')
        },
        {
          id: this.gameIdeaService.uuidv4(),
          description: "A survival game where players must collaborate or compete in a post-apocalyptic wasteland.",
          upvotes: 85,
          downvotes: 5,
          userVote: "downvote",
          dateCreated: new Date('2024-10-15')
        },
        {
          id: this.gameIdeaService.uuidv4(),
          description: "A rhythm-based action game where you defeat enemies by syncing attacks with the music.",
          upvotes: 200,
          downvotes: 15,
          userVote: null,
          dateCreated: new Date('2024-09-30')
        },
        {
          id: this.gameIdeaService.uuidv4(),
          description: "A strategy game where players must manage a space colony and survive harsh conditions.",
          upvotes: 300,
          downvotes: 20,
          userVote: "upvote",
          dateCreated: new Date('2024-10-20')
        }
      ];
      this.gameIdeaService.saveIdeas(gameIdeas)
    }
  }

  newGameIdeaAdded(gameIdea: GameIdea) {
    this.ideaListComponent.gameIdeals.unshift(gameIdea);
  }
}
