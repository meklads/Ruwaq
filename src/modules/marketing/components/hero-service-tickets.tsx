import {
  TICKET_ILLUSTRATIONS,
  type TicketIllustrationId,
} from "@/modules/marketing/components/hero-ticket-illustrations";

type Ticket = {
  illustration: TicketIllustrationId;
  title: string;
  body: string;
};

type Props = {
  tickets: readonly Ticket[];
};

const TICKET_DELAYS = ["", "ruwaq-reveal-delay-1", "ruwaq-reveal-delay-2", "ruwaq-reveal-delay-3"] as const;

/** Proposal component tickets — overlap hero bottom, centered illustration layout. */
export function HeroServiceTickets({ tickets }: Props) {
  return (
    <section className="ruwaq-hero-tickets-band" aria-label="Proposal components">
      <div className="ruwaq-hero-tickets">
        {tickets.map((ticket, i) => {
          const delayClass = TICKET_DELAYS[i] ?? "ruwaq-reveal-delay-3";
          const Illustration = TICKET_ILLUSTRATIONS[ticket.illustration];

          return (
            <article key={ticket.title} className={`ruwaq-hero-ticket ruwaq-reveal ${delayClass}`.trim()}>
              <div className="ruwaq-hero-ticket-art">
                <Illustration className="ruwaq-hero-ticket-svg" />
              </div>
              <h3 className="ruwaq-hero-ticket-title">{ticket.title}</h3>
              <p className="ruwaq-hero-ticket-body">{ticket.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
