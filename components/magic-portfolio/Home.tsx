import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Row,
} from "@once-ui-system/core";
import { person, about } from "@magic/resources";
import { ProjectCard } from "@magic/components/ProjectCard";
import {
  cardProps,
  portfolioBase,
  visibleProjects,
  type Copy,
} from "./adapter";
import type { Track } from "@/components/portfolio/track";
export function MagicProjects({ copy, track }: { copy: Copy; track: Track }) {
  return (
    <Column fillWidth gap="xl" id={track === "sales" ? "projects" : "cases"}>
      {visibleProjects(copy).map(({ project }) => (
        <ProjectCard key={project.slug} {...cardProps(project, track)} />
      ))}
    </Column>
  );
}
export function MagicHome({ copy, track }: { copy: Copy; track: Track }) {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="center"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {copy.hero.name}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={200}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {copy.hero.role}
              <br />
              {copy.hero.title}
            </Text>
          </RevealFx>
          <RevealFx
            paddingTop="12"
            delay={400}
            horizontal="center"
            paddingLeft="12"
          >
            <Button
              id="about"
              data-border="rounded"
              href={`${portfolioBase(track)}/about`}
              variant="secondary"
              size="m"
              weight="default"
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                    aria-hidden
                  />
                )}
                소개·경력
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={600} fillWidth>
        <MagicProjects copy={copy} track={track} />
      </RevealFx>
      <Column id="contact" fillWidth gap="16" paddingY="32">
        <Heading as="h2" variant="heading-strong-l">
          {copy.contact.title}
        </Heading>
        <Text onBackground="neutral-weak">{copy.contact.lead}</Text>
        <Button href={`mailto:${person.email}`} variant="secondary" size="m">
          이메일 보내기
        </Button>
      </Column>
    </Column>
  );
}
