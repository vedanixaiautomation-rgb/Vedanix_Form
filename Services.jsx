import { Section } from "../components/Section";
import { ServiceGrid } from "../components/ServiceGrid";

export function Services() {
  return (
    <Section eyebrow="Services" title="AI, automation, web, SaaS, and API systems under one roof." text="Each service is built around measurable outcomes: faster lead response, lower admin load, cleaner data movement, and stronger customer experiences.">
      <ServiceGrid />
    </Section>
  );
}
