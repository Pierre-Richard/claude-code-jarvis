import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { CONVERSATIONS, THREAD, ChatMessage, Conversation } from '../../models/data';

function initialsOf(name: string): string {
  const parts = name.replace(/^(Dr\.?|M\.?|Mme)\s+/i, '').split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'IA';
}

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './messaging.html',
})
export class MessagingComponent {
  protected readonly conversations = signal<Conversation[]>(CONVERSATIONS.map((c) => ({ ...c })));
  protected readonly activeId = signal(CONVERSATIONS[0].id);
  protected readonly thread = signal<ChatMessage[]>([...THREAD]);
  protected readonly draft = signal('');

  protected readonly active = computed(() => this.conversations().find((c) => c.id === this.activeId()) ?? this.conversations()[0]);

  private readonly route = inject(ActivatedRoute);

  constructor() {
    // Conversation ciblée depuis une fiche expert (« Envoyer un message »).
    const name = this.route.snapshot.queryParamMap.get('name');
    if (name) {
      this.openWith(name, this.route.snapshot.queryParamMap.get('initials') ?? initialsOf(name));
    } else {
      this.select(this.activeId());
    }
  }

  /** Ouvre (ou crée) la conversation avec un interlocuteur donné et la sélectionne. */
  private openWith(name: string, initials: string): void {
    const existing = this.conversations().find((c) => c.name === name);
    if (existing) {
      this.select(existing.id);
      return;
    }
    const conv: Conversation = {
      id: 'to-' + name.toLowerCase().replace(/\s+/g, '-'),
      name,
      initials,
      last: 'Nouvelle conversation',
      time: 'maintenant',
      unread: false,
    };
    this.conversations.update((list) => [conv, ...list]);
    this.activeId.set(conv.id);
    this.thread.set([]); // fil vierge pour une nouvelle conversation
  }

  /** Ouvre une conversation et la marque comme lue. */
  protected select(id: string): void {
    this.activeId.set(id);
    this.conversations.update((list) => list.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  }

  protected send(): void {
    const text = this.draft().trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    this.thread.update((t) => [...t, { id: 'local-' + t.length, text, time, mine: true }]);
    this.draft.set('');
  }
}
