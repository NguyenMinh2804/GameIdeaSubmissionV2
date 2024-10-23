import { Component, EventEmitter, Output } from '@angular/core';
import { GameIdea } from 'src/app/models/GameIdea';
import { GameIdeaService } from 'src/app/services/game-idea.service';

@Component({
  selector: 'app-idea-entry',
  templateUrl: './idea-entry.component.html',
  styleUrls: ['./idea-entry.component.css']
})
export class IdeaEntryComponent {

  gameIdeal: GameIdea = new GameIdea()

  @Output() gameIdeaAdded = new EventEmitter<GameIdea>();

  constructor(
    private gameIdeaService: GameIdeaService
  ) { }

  onSubmit() {
    this.gameIdeal.id = this.gameIdeaService.uuidv4();
    this.gameIdeal.dateCreated = new Date();
    this.gameIdeaService.addIdea(this.gameIdeal);
    this.gameIdeaAdded.emit(this.gameIdeal)
    this.gameIdeal = new GameIdea();
  }

}
