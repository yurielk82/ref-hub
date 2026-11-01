import { notFound } from "next/navigation";
import {
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
} from "@once-ui-system/core";
import { CASE_STATUS_LABEL } from "@/data/ax-types";
import { PORTFOLIO_MENUS } from "@/data/portfolio-menus";
import type { Track } from "@/components/portfolio/track";
import { allScreens, portfolioBase, type Copy } from "./adapter";
import { MenuGallery } from "./MenuGallery";
export function MagicDetail({
  copy,
  track,
  slug,
}: {
  copy: Copy;
  track: Track;
  slug: string;
}) {
  const detail = copy.details.find((d) => d.project.slug === slug);
  if (!detail) notFound();
  const { project, study } = detail;
  const screens = allScreens(copy);
  const menuDefinition = PORTFOLIO_MENUS[slug as keyof typeof PORTFOLIO_MENUS];
  const groups = menuDefinition
    ? menuDefinition.map((m) => ({
        id: m.id,
        name: m.name,
        screens: m.sources.flatMap((src) => {
          const s = screens.get(src);
          return s ? [s] : [];
        }),
      }))
    : [{ id: slug, name: project.name, screens: project.screens ?? [] }];
  const view = track === "ax" ? study?.ax : undefined;
  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={track === "sales" ? "/#projects" : "/ax#cases"}>
          <Text variant="label-strong-m">프로젝트 목록</Text>
        </SmartLink>
        <Heading variant="display-strong-m">{project.name}</Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m">
          {project.tagline}
        </Text>
      </Column>
      {project.screenshot && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={project.name}
          src={project.screenshot}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs" gap="32">
        <Text onBackground="neutral-weak">{project.description}</Text>
        {study && (
          <>
            <Row gap="24" wrap>
              <Column gap="8">
                <Text variant="label-strong-m">맡은 역할</Text>
                <Text>{study.role}</Text>
              </Column>
              <Column gap="8">
                <Text variant="label-strong-m">기간·현재 상태</Text>
                <Text>{study.period}</Text>
                <Text>
                  {CASE_STATUS_LABEL[study.status.kind]} · {study.status.note}
                </Text>
              </Column>
            </Row>
            <Column gap="16">
              <Heading as="h2" variant="heading-strong-l">
                해결해야 했던 일
              </Heading>
              <Text>{view?.problem ?? study.problem}</Text>
            </Column>
            <Column gap="16">
              <Heading as="h2" variant="heading-strong-l">
                직접 바꾼 일
              </Heading>
              <Text>{view?.build ?? study.intervention}</Text>
              {study.steps?.map((step) => (
                <Column key={step.title} gap="8">
                  <Heading as="h3" variant="heading-strong-m">
                    {step.title}
                  </Heading>
                  <Text onBackground="neutral-weak">{step.body}</Text>
                </Column>
              ))}
            </Column>
          </>
        )}
        {view && (
          <Column gap="16">
            <Heading as="h2" variant="heading-strong-l">
              자동화·AI 활용 범위
            </Heading>
            <Text>{view.automation}</Text>
          </Column>
        )}
        <MenuGallery groups={groups} />
        {project.screensNote && (
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {project.screensNote}
          </Text>
        )}
        {study && (
          <Column gap="16">
            <Heading as="h2" variant="heading-strong-l">
              결과와 현재 상태
            </Heading>
            <Text>{view?.operation ?? study.outcome}</Text>
          </Column>
        )}
      </Column>
      <SmartLink href={`${portfolioBase(track)}/about`}>소개·경력</SmartLink>
    </Column>
  );
}
