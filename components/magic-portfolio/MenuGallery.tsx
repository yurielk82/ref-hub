"use client";
import { useState } from "react";
import { Column, Heading, Text, Media, Select } from "@once-ui-system/core";
import type { ProjectScreen } from "@/data/project-types";
export function MenuGallery({
  groups,
}: {
  groups: { id: string; name: string; screens: ProjectScreen[] }[];
}) {
  const [selected, setSelected] = useState(groups[0]?.id ?? "");
  const group = groups.find((g) => g.id === selected) ?? groups[0];
  if (!group) return null;
  return (
    <Column fillWidth gap="24" id="screens">
      <Heading as="h2" variant="heading-strong-l">
        만든 화면
      </Heading>
      {groups.length > 1 && (
        <Select
          id="project-menu"
          label="업무 메뉴"
          value={selected}
          options={groups.map((g) => ({ value: g.id, label: g.name }))}
          onSelect={(value) => setSelected(String(value))}
        />
      )}
      <Heading as="h3" variant="heading-strong-m">
        {group.name}
      </Heading>
      {group.screens.length ? (
        group.screens.map((screen) => (
          <Column key={screen.src} fillWidth gap="12">
            <Heading as="h4" variant="heading-strong-s">
              {screen.title}
            </Heading>
            <Media radius="m" enlarge src={screen.src} alt={screen.title} />
            <Text onBackground="neutral-weak" variant="body-default-s">
              {screen.caption}
            </Text>
          </Column>
        ))
      ) : (
        <Text onBackground="neutral-weak">
          이 메뉴의 별도 공개 캡처는 없습니다.
        </Text>
      )}
    </Column>
  );
}
