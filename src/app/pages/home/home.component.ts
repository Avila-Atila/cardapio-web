import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { DishSelectorComponent } from '../../components/dish-selector/dish-selector.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DishSelectorComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.configService.getConfig().subscribe((resp) => {
      this.openState.set(resp[0].aberto);
    });
  }
  openState = signal<boolean>(false);
  configService = inject(ConfigService);
}
