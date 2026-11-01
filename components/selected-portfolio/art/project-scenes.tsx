import { useId, type ComponentType } from "react";
import type { Project } from "@/lib/selected-portfolio/types";
import {
  FoldedPaper,
  Ledger,
  PaperLines,
  Plane,
  Prism,
  SceneLabel,
} from "./scene-shapes";
import "@/components/selected-portfolio/project-scenes.css";

type SceneDefinition = {
  title: string;
  description: string;
  Scene: ComponentType;
  Mark: ComponentType;
};
type ProjectIdentity = Pick<Project, "id" | "name">;

function KpiScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={473} cy={328} rx={245} ry={38} />
      </g>
      <g className="scene-align">
        <Ledger
          x={-237}
          y={-28}
          z={58}
          width={142}
          depth={176}
          title="원천 자료"
          rows={4}
        />
        <Ledger
          x={-217}
          y={-23}
          z={79}
          width={142}
          depth={176}
          title="업무 기준"
          rows={4}
        />
      </g>
      <Prism
        x={-65}
        y={-75}
        z={6}
        width={294}
        depth={244}
        height={14}
        tone="muted"
      />
      <Ledger
        x={-65}
        y={-75}
        z={35}
        width={294}
        depth={244}
        title="조회 · 검증"
        rows={7}
        accent
      />
      <Plane x={-65} y={-75} z={43}>
        <rect
          className="scene-query-window"
          x={163}
          y={117}
          width={109}
          height={47}
          rx={3}
        />
        <path
          className="scene-highlight-stroke scene-trace"
          d="M177 140h26l10-9 13 12 12-6h19"
        />
        <circle className="scene-exception" cx={268} cy={203} r={5} />
      </Plane>
      <SceneLabel x={210} y={53}>
        여러 곳의 자료
      </SceneLabel>
      <SceneLabel x={790} y={420} anchor="end" to={{ x: 639, y: 289 }}>
        한 기준으로 확인
      </SceneLabel>
    </>
  );
}

function KpiMark() {
  return (
    <>
      <path d="M16 17h32v39H16Zm10 10h12m-12 9h12M55 27h48v29H55Z" />
      <path d="M62 36h33M62 45h20M39 44l17-8" />
      <path className="scene-mark-accent" d="M89 45h7" />
    </>
  );
}

function SfeScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={475} cy={338} rx={245} ry={34} />
      </g>
      <g transform="translate(235 72) rotate(-7 140 130)">
        <FoldedPaper width={219} height={250} title="영업 활동">
          <PaperLines width={219} rows={5} />
        </FoldedPaper>
      </g>
      <g
        transform="translate(412 103) matrix(1 .1 -.16 .95 0 0)"
        className="scene-analysis-sheet"
      >
        <FoldedPaper width={310} height={258} title="매일 보는 분석">
          <path
            className="scene-grid"
            d="M40 75v135h220M40 165h220M40 120h220M95 75v135M150 75v135M205 75v135"
          />
          <path
            className="scene-activity-path"
            d="M57 185 97 164 151 176 198 125 245 99"
          />
          <g className="scene-interpret">
            <circle className="scene-focus-ring" cx={198} cy={125} r={26} />
            <path className="scene-highlight-stroke" d="m218 145 35 35" />
          </g>
        </FoldedPaper>
      </g>
      <SceneLabel x={193} y={42}>
        활동 기록
      </SceneLabel>
      <SceneLabel x={767} y={389} anchor="end">
        지표를 보고 해석하는 시간
      </SceneLabel>
    </>
  );
}

function SfeMark() {
  return (
    <>
      <path d="M15 14h34v43H15Zm8 11h17m-17 9h17m-17 9h10M60 48V19m0 29h43M66 40l10-8 9 4 13-14" />
      <circle className="scene-mark-accent" cx={91} cy={28} r={12} />
      <path d="m100 37 9 11" />
    </>
  );
}

function SnopScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={486} cy={334} rx={238} ry={32} />
      </g>
      <Prism
        x={-175}
        y={-135}
        z={0}
        width={350}
        depth={270}
        height={13}
        tone="muted"
      />
      <Plane x={-175} y={-135} z={15}>
        <path
          className="scene-grid"
          d="M35 48h285M35 96h285M35 144h285M35 192h285M82 25v220M144 25v220M206 25v220M268 25v220"
        />
        <path
          className="scene-plan-demand scene-trace"
          d="M33 190C90 190 110 67 167 70S255 156 320 82"
        />
        <path
          className="scene-plan-supply"
          d="M33 118C100 118 108 175 172 141S262 52 320 55"
        />
        <path className="scene-plan-join" d="M166 70v72" />
      </Plane>
      <Prism
        x={-13}
        y={-56}
        z={18}
        width={27}
        depth={114}
        height={87}
        tone="accent"
      />
      <Plane x={-60} y={-14} z={113}>
        <path className="scene-linking-axis" d="M0 0h120" />
      </Plane>
      <SceneLabel x={209} y={75}>
        수요
      </SceneLabel>
      <SceneLabel x={739} y={92} anchor="end">
        공급
      </SceneLabel>
      <SceneLabel x={737} y={363} anchor="end">
        재고와 함께 검토하는 계획
      </SceneLabel>
    </>
  );
}

function SnopMark() {
  return (
    <>
      <path d="M10 48h100M15 39c25 0 20-23 43-23s23 21 47 0M15 24c25 0 20 23 43 23s23-21 47-23" />
      <path className="scene-mark-accent" d="M58 10v45" />
    </>
  );
}

function InventoryScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={494} cy={341} rx={236} ry={34} />
      </g>
      <Prism
        x={-155}
        y={-125}
        z={0}
        width={310}
        depth={250}
        height={18}
        tone="muted"
      />
      <Plane x={-155} y={-125} z={19}>
        <path
          className="scene-grid"
          d="M20 53h270M20 100h270M20 147h270M20 194h270M77 20v208M155 20v208M233 20v208"
        />
        <text className="scene-sheet-title" x={23} y={37}>
          유통재고 현황
        </text>
      </Plane>
      <g className="scene-inventory-lift">
        <Prism x={-105} y={-31} z={21} width={71} depth={71} height={52} />
        <Prism
          x={-18}
          y={-31}
          z={21}
          width={71}
          depth={71}
          height={89}
          tone="accent"
        />
        <Prism x={69} y={-31} z={21} width={71} depth={71} height={67} />
      </g>
      <Ledger
        x={-235}
        y={29}
        z={19}
        width={118}
        depth={153}
        title="입력 자료"
        rows={4}
      />
      <SceneLabel x={180} y={88}>
        옮겨 적던 자료
      </SceneLabel>
      <SceneLabel x={776} y={337} anchor="end">
        재고 파악 · 보고
      </SceneLabel>
    </>
  );
}

function InventoryMark() {
  return (
    <>
      <path d="m15 43 42-23 49 22-43 25Z" />
      <path d="M31 42V28l12-6 14 6v15m8 4V16l13-6 14 6v30" />
      <path className="scene-mark-accent" d="m65 16 13 7 14-7M78 23v30" />
    </>
  );
}

function ellipsePoint(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius * 0.49,
  };
}

function ringPath(start: number, end: number, outer: number, inner: number) {
  const a = ellipsePoint(421, 210, outer, start),
    b = ellipsePoint(421, 210, outer, end);
  const c = ellipsePoint(421, 210, inner, end),
    d = ellipsePoint(421, 210, inner, start);
  const large = end - start > Math.PI ? 1 : 0;
  return `M${a.x} ${a.y}A${outer} ${outer * 0.49} 0 ${large} 1 ${b.x} ${b.y}L${c.x} ${c.y}A${inner} ${inner * 0.49} 0 ${large} 0 ${d.x} ${d.y}Z`;
}

function ringEdge(start: number, end: number, outer: number, inner: number) {
  const a = ellipsePoint(421, 210, outer, start),
    b = ellipsePoint(421, 210, outer, end);
  const c = ellipsePoint(421, 210, inner, end);
  return `M${a.x} ${a.y}A${outer} ${outer * 0.49} 0 0 1 ${b.x} ${b.y}L${b.x} ${b.y + 21}A${outer} ${outer * 0.49} 0 0 0 ${a.x} ${a.y + 21}ZM${b.x} ${b.y}L${c.x} ${c.y}v21L${b.x} ${b.y + 21}Z`;
}

function BiScene() {
  const sections = [-2.9, -1.2, -0.13, 1.05, 2.1, Math.PI * 2 - 2.9];
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={470} cy={326} rx={252} ry={29} />
      </g>
      <path
        className="scene-donut-side"
        d="M226 210a195 95.55 0 0 0 390 0v38a195 95.55 0 0 1-390 0Z"
      />
      <ellipse
        className="scene-donut-inner"
        cx={421}
        cy={210}
        rx={89}
        ry={43.6}
      />
      {sections.slice(0, -1).map((start, index) => {
        const end = sections[index + 1];
        if (end === undefined) return null;
        return (
          <g
            key={start}
            className={index === 1 ? "scene-selected-sector" : undefined}
          >
            {index === 1 ? (
              <path
                className="scene-donut-selected-edge"
                d={ringEdge(start + 0.012, end - 0.012, 195, 89)}
              />
            ) : null}
            <path
              className={`scene-donut-sector scene-donut-sector-${index}`}
              d={ringPath(start + 0.012, end - 0.012, 195, 89)}
            />
          </g>
        );
      })}
      <g className="scene-report-detail">
        <Ledger
          x={80}
          y={-205}
          z={24}
          width={174}
          depth={188}
          title="상세 조회"
          rows={5}
          accent
        />
      </g>
      <path className="scene-leader" d="M580 169h36l31 31h27" />
      <SceneLabel x={207} y={72}>
        판매 구성
      </SceneLabel>
      <SceneLabel x={795} y={334} anchor="end">
        품목 · 거래처 상세
      </SceneLabel>
    </>
  );
}

function BiMark() {
  return (
    <>
      <path d="M59 22a34 20 0 1 0 0 29l-13-9a14 8 0 1 1 0-11Z" />
      <path className="scene-mark-accent" d="m60 15 13 15-16 8-13-15Z" />
      <path d="M79 29h26v31H79Zm5 10h16m-16 8h16m-16 8h10" />
    </>
  );
}

function KpisScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={480} cy={354} rx={280} ry={30} />
      </g>
      <path
        className="scene-book-edge"
        d="m190 288 290 77 290-77v17l-290 79-290-79Z"
      />
      <path className="scene-book-left" d="m190 65 290 77v223l-290-77Z" />
      <path className="scene-book-right" d="m480 142 290-77v223l-290 77Z" />
      <g transform="matrix(1 .265 0 1 190 65)">
        <text className="scene-sheet-title" x={28} y={40}>
          주문 내역
        </text>
        <PaperLines width={290} rows={5} />
        <path className="scene-highlight-stroke" d="M27 139h236" />
      </g>
      <g transform="matrix(1 -.265 0 1 480 142)">
        <text className="scene-sheet-title" x={28} y={40}>
          보고 자료
        </text>
        <PaperLines width={290} rows={5} />
        <path className="scene-highlight-stroke scene-trace" d="M27 139h236" />
        <rect
          className="scene-review-cell"
          x={162}
          y={121}
          width={52}
          height={22}
          rx={2}
        />
      </g>
      <path className="scene-book-spine" d="M480 142v223" />
      <path className="scene-reconcile-rule" d="m251 220 229 61 228-61" />
      <SceneLabel x={481} y={45} anchor="middle">
        같은 행 · 같은 기준으로 대조
      </SceneLabel>
    </>
  );
}

function KpisMark() {
  return (
    <>
      <path d="m15 15 45 12 45-12v36L60 64 15 51Zm45 12v37M23 30l30 8m14 0 30-8M23 41l30 8m14 0 30-8" />
      <path className="scene-mark-accent" d="m30 40 30 8 30-8" />
    </>
  );
}

function CsoScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={484} cy={352} rx={225} ry={27} />
      </g>
      <g transform="translate(246 91) rotate(-10 145 120)">
        <FoldedPaper width={247} height={244} title="처방 자료">
          <PaperLines width={247} rows={5} />
        </FoldedPaper>
      </g>
      <g
        transform="matrix(.98 .1 -.14 .94 365 38)"
        className="scene-sort-document"
      >
        <FoldedPaper width={304} height={328} title="정산 자료">
          <PaperLines width={304} rows={7} />
          <path className="scene-highlight-stroke" d="M28 164h247" />
        </FoldedPaper>
        <path
          className="scene-folder-tab"
          d="M304 83h32v66h-32M304 180h32v66h-32"
        />
        <path className="scene-folder-tab-line" d="M315 104v23m0 74v23" />
      </g>
      <SceneLabel x={183} y={63}>
        자료 검토
      </SceneLabel>
      <SceneLabel x={770} y={365} anchor="end">
        업체별 정산 조회
      </SceneLabel>
    </>
  );
}

function CsoMark() {
  return (
    <>
      <path d="M25 20H13v40h65V49M29 9h48l18 17v35H29Zm48 0v18h18M39 35h44M39 45h30M39 54h21" />
      <path className="scene-mark-accent" d="M95 32h11v13H95M95 48h11v13H95" />
    </>
  );
}

function ErpScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={479} cy={349} rx={262} ry={27} />
      </g>
      <g transform="matrix(1 .12 -.19 .82 204 32)">
        <path className="scene-blueprint-side" d="M0 340h610V0l11 11v340H11Z" />
        <path className="scene-blueprint-face" d="M0 0h610v340H0Z" />
        <text className="scene-sheet-title" x={29} y={37}>
          데이터 구조 정의
        </text>
        <path
          className="scene-relation scene-trace"
          d="M147 121h45l24 24h39M368 207h39l30 30h39"
        />
        <g className="scene-erd-table">
          <rect x={28} y={78} width={120} height={141} rx={2} />
          <path d="M28 114h120m-120 35h120m-120 35h120M63 114v105" />
          <text x={40} y={101}>
            테이블 A
          </text>
        </g>
        <g className="scene-erd-table scene-erd-main">
          <rect x={216} y={90} width={175} height={208} rx={2} />
          <path d="M216 129h175m-175 39h175m-175 39h175m-175 39h175M262 129v169" />
          <text x={233} y={116}>
            기준 테이블
          </text>
        </g>
        <g className="scene-erd-table">
          <rect x={476} y={177} width={112} height={132} rx={2} />
          <path d="M476 214h112m-112 32h112m-112 32h112M511 214v95" />
          <text x={488} y={201}>
            테이블 B
          </text>
        </g>
        <circle className="scene-port" cx={148} cy={121} r={4} />
        <circle className="scene-port" cx={216} cy={145} r={4} />
        <circle className="scene-port" cx={391} cy={207} r={4} />
        <circle className="scene-port" cx={476} cy={237} r={4} />
      </g>
      <SceneLabel x={800} y={420} anchor="end">
        표의 관계를 읽을 수 있는 문서
      </SceneLabel>
    </>
  );
}

function ErpMark() {
  return (
    <>
      <path d="M9 13h31v29H9Zm39 15h33v36H48ZM88 8h25v28H88ZM9 23h31m8 15h33M88 18h25M40 32h8m33 9h9l9-9" />
      <path className="scene-mark-accent" d="M40 32h8m33 9h9l9-9" />
    </>
  );
}

function PulseScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={475} cy={346} rx={236} ry={31} />
      </g>
      <g transform="matrix(.92 .12 -.12 .96 270 59)">
        <FoldedPaper width={208} height={258} title="개인 응답">
          <PaperLines width={208} rows={5} />
        </FoldedPaper>
      </g>
      <path className="scene-privacy-depth" d="m443 65 22-7v274l-22 9Z" />
      <path
        className="scene-privacy-boundary"
        d="M443 65c28-9 54-9 78-1v275c-25-8-52-8-78 2Z"
      />
      <g className="scene-team-result" transform="translate(615 217)">
        <path
          className="scene-team-outline"
          d="M-93-16c0-53 40-84 94-84s92 31 92 84v70C41 84-42 84-93 54Z"
        />
        <ellipse className="scene-team-top" cx={0} cy={-16} rx={93} ry={47} />
        <path
          className="scene-team-trace"
          d="M-58-22c24-20 37 15 59-1s38 7 57-10M-58-3c20-14 35 12 60-1s38 6 56-7M-58 16c21-14 39 14 62-1s36 6 54-7"
        />
        <path
          className="scene-team-outline-line"
          d="M-55 50c30 12 81 12 110 0"
        />
      </g>
      <SceneLabel x={205} y={39}>
        개인의 응답
      </SceneLabel>
      <SceneLabel x={776} y={365} anchor="end">
        팀의 협업을 돌아보는 참고
      </SceneLabel>
    </>
  );
}

function PulseMark() {
  return (
    <>
      <path d="M19 15h30v43H19Zm8 11h14m-14 9h14m-14 9h10M58 8v57" />
      <path d="M71 34c0-17 31-17 31 0v17c-9 8-22 8-31 0Z" />
      <ellipse cx={86.5} cy={34} rx={15.5} ry={8} />
      <path className="scene-mark-accent" d="M58 8v57" />
    </>
  );
}

function ToolsScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={480} cy={351} rx={249} ry={28} />
      </g>
      <g transform="matrix(1 .12 -.2 .93 305 34)">
        <path className="scene-code-book-edge" d="M0 317h390V0l11 8v320H11Z" />
        <path className="scene-code-sheet" d="M0 0h390v317H0Z" />
        <text className="scene-sheet-title" x={28} y={39}>
          개발 작업
        </text>
        <path
          className="scene-code-bracket"
          d="m65 87-22 23 22 23m259-46 22 23-22 23"
        />
        <g className="scene-code-lines">
          <path d="M97 92h101m14 0h55M97 114h56m15 0h109M97 136h101M40 181h101m15 0h148M40 206h70m15 0h110M40 231h131m15 0h118M40 256h73m15 0h138" />
        </g>
        <g className="scene-inspection-rule">
          <path className="scene-inspection-face" d="M-22 166h435v32H-22Z" />
          <path className="scene-inspection-edge" d="M-22 198h435v8H-22Z" />
          <path
            className="scene-inspection-ticks"
            d="M-8 166v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7m20-7v11m20-11v7"
          />
          <text className="scene-inspection-text" x={257} y={188}>
            규칙 · 검사
          </text>
        </g>
      </g>
      <SceneLabel x={211} y={20}>
        작업에 붙는 기준
      </SceneLabel>
      <SceneLabel x={793} y={420} anchor="end">
        만드는 과정에서 확인
      </SceneLabel>
    </>
  );
}

function ToolsMark() {
  return (
    <>
      <path d="M21 9h77v53H21ZM40 21l-10 10 10 10m39-20 10 10-10 10M49 39l13-20M12 43h96v11H12Z" />
      <path className="scene-mark-accent" d="M12 43h96v11H12Z" />
    </>
  );
}

function EvaluationScene() {
  return (
    <>
      <g className="scene-shadow">
        <ellipse cx={480} cy={346} rx={255} ry={30} />
      </g>
      <Prism
        x={-245}
        y={-66}
        z={0}
        width={490}
        depth={132}
        height={23}
        tone="muted"
      />
      <g transform="matrix(.91 .17 -.14 .88 263 80)">
        <FoldedPaper width={185} height={233} title="현재 방식">
          <PaperLines width={185} rows={5} />
        </FoldedPaper>
      </g>
      <g transform="matrix(.91 -.17 .14 .88 534 111)">
        <FoldedPaper width={185} height={233} title="도입 후보">
          <PaperLines width={185} rows={5} />
        </FoldedPaper>
      </g>
      <path className="scene-compare-rail" d="M247 302h465v22H247Z" />
      <path
        className="scene-compare-ticks"
        d="M266 302v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6m25-6v10m25-10v6"
      />
      <g className="scene-comparison-window">
        <path className="scene-comparison-lens" d="M435 110h88v185h-88Z" />
        <path
          className="scene-highlight-stroke"
          d="M451 159h56m-56 42h56m-56 42h56"
        />
      </g>
      <SceneLabel x={481} y={47} anchor="middle">
        같은 조건에서 비교
      </SceneLabel>
      <SceneLabel x={771} y={382} anchor="end">
        만들기 전에 판단
      </SceneLabel>
    </>
  );
}

function EvaluationMark() {
  return (
    <>
      <path d="M15 15h31v39H15Zm59 0h31v39H74ZM9 57h102M23 26h15m-15 9h15m-15 9h15m44-18h15m-15 9h15m-15 9h15" />
      <path className="scene-mark-accent" d="M54 9h12v48H54Z" />
    </>
  );
}

const scenes = new Map<string, SceneDefinition>([
  [
    "kpi",
    {
      title: "원천 자료를 조회와 검증으로",
      description:
        "분절된 장부를 같은 업무 기준으로 정렬하고 조회하는 흐름을 나타낸 설명용 입체 그림입니다. 실제 데이터 값이나 모든 오류의 해결을 나타내지 않습니다.",
      Scene: KpiScene,
      Mark: KpiMark,
    },
  ],
  [
    "kpi-sfe",
    {
      title: "활동 기록에서 매일의 해석으로",
      description:
        "영업 활동 기록을 분석하고 지표를 해석하는 일을 나타낸 설명용 그림입니다. 선의 높이는 실제 실적이나 개선 수치가 아닙니다.",
      Scene: SfeScene,
      Mark: SfeMark,
    },
  ],
  [
    "kpi-snop",
    {
      title: "수요 · 공급 · 재고를 함께 검토",
      description:
        "개인 시제품에서 수요와 공급 계획을 재고와 함께 검토하는 개념을 나타냅니다. 실제 업무 적용이나 측정 결과를 뜻하지 않습니다.",
      Scene: SnopScene,
      Mark: SnopMark,
    },
  ],
  [
    "kpi-inventory",
    {
      title: "옮겨 적던 숫자를 재고 현황으로",
      description:
        "ERP와 엑셀의 입력 자료를 재고 파악과 보고에 연결하려는 준비 중인 화면의 개념도입니다. 입체 높이는 실제 재고 수량이 아닙니다.",
      Scene: InventoryScene,
      Mark: InventoryMark,
    },
  ],
  [
    "bi",
    {
      title: "전체 구성에서 관련 상세로",
      description:
        "일일 실적의 구성 구분을 선택해 품목과 거래처 상세를 확인하는 흐름입니다. 도넛의 구분 크기는 실제 매출 비중이 아닙니다.",
      Scene: BiScene,
      Mark: BiMark,
    },
  ],
  [
    "kpis",
    {
      title: "주문과 보고 자료를 같은 기준으로",
      description:
        "주문 내역과 보고 자료의 같은 행을 대조하는 설명용 장부입니다. 기관 승인이나 오류 없는 완료를 뜻하지 않습니다.",
      Scene: KpisScene,
      Mark: KpisMark,
    },
  ],
  [
    "csoweb",
    {
      title: "처방 자료 검토와 업체별 정산",
      description:
        "처방 자료를 검토하고 업체별 정산 자료를 조회했던 작업을 나타냅니다. 자체 포털의 현재 운영을 뜻하지 않습니다.",
      Scene: CsoScene,
      Mark: CsoMark,
    },
  ],
  [
    "erp-spec",
    {
      title: "표 사이의 관계를 읽을 수 있게",
      description:
        "테이블의 열과 관계를 문서로 정리한 작업을 나타냅니다. 테이블 A와 B는 설명용 대상이며 실제 전체 구조나 확인 비율을 표시하지 않습니다.",
      Scene: ErpScene,
      Mark: ErpMark,
    },
  ],
  [
    "team-pulse",
    {
      title: "개인의 응답과 팀의 참고를 구분",
      description:
        "개인 응답과 팀의 협업 참고 결과를 구분해 보는 흐름입니다. 사람의 성격이나 팀의 실제 점수를 판정하는 그림이 아닙니다.",
      Scene: PulseScene,
      Mark: PulseMark,
    },
  ],
  [
    "claude-dotfiles",
    {
      title: "개발 작업에 규칙과 검사를 연결",
      description:
        "개발 원고에 작업 규칙과 검사를 연결하는 도구를 나타냅니다. 모든 검사 통과나 보안 보장을 나타내지 않습니다.",
      Scene: ToolsScene,
      Mark: ToolsMark,
    },
  ],
  [
    "har-eval",
    {
      title: "새로 만들기 전에 같은 조건으로 비교",
      description:
        "현재 방식과 도입 후보를 같은 조건에서 비교해 도구 도입을 판단하는 절차입니다. 네트워크 HAR 분석이나 성능 개선 수치를 나타내지 않습니다.",
      Scene: EvaluationScene,
      Mark: EvaluationMark,
    },
  ],
]);

export function hasProjectScene(id: string) {
  return scenes.has(id);
}

export function ProjectScene({ project }: { project: ProjectIdentity }) {
  const id = useId();
  const definition = scenes.get(project.id);
  if (!definition) return null;
  const Scene = definition.Scene;
  return (
    <figure className="project-scene" data-project-scene={project.id}>
      <svg
        viewBox="100 0 760 430"
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
      >
        <title id={`${id}-title`}>
          {project.name} · {definition.title}
        </title>
        <desc id={`${id}-description`}>{definition.description}</desc>
        <Scene />
      </svg>
      <figcaption>
        <span>{definition.title}</span>
        <span>업무 흐름을 표현한 개념도</span>
      </figcaption>
    </figure>
  );
}

export function ProjectSceneMark({ project }: { project: ProjectIdentity }) {
  const definition = scenes.get(project.id);
  if (!definition) return null;
  const Mark = definition.Mark;
  return (
    <svg
      className="project-scene-mark"
      viewBox="0 0 120 72"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Mark />
    </svg>
  );
}
