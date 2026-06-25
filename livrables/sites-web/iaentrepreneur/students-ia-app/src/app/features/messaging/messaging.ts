import { Component, computed, signal } from '@angular/core';
import { IconComponent } from '../../ui/icon';
import { CONVERSATIONS, THREAD, ChatMessage } from '../../models/data';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './messaging.html',
})
export class MessagingComponent {
  protected readonly conversations = CONVERSATIONS;
  protected readonly activeId = signal(CONVERSATIONS[0].id);
  protected readonly thread = signal<ChatMessage[]>([...THREAD]);
  protected readonly draft = signal('');

  protected readonly active = computed(() => this.conversations.find((c) => c.id === this.activeId()) ?? this.conversations[0]);

  protected send(): void {
    const text = this.draft().trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    this.thread.update((t) => [...t, { id: 'local-' + t.length, text, time, mine: true }]);
    this.draft.set('');
  }
}
