export const PORTFOLIO_MENUS = {
  pharmkpi: [
    {
      id: "kpi",
      name: "KPI",
      sources: [
        "/images/portfolio/pharmkpi/overview.webp",
        "/images/portfolio/pharmkpi/sales-causes.webp",
        "/images/portfolio/pharmkpi/sales-comparison.webp",
        "/images/portfolio/pharmkpi/verification.webp",
      ],
    },
    {
      id: "reports",
      name: "영업리포트",
      sources: [
        "/images/portfolio/monthly-sales-reports/sales-collection.webp",
        "/images/portfolio/monthly-sales-reports/brand-sku.webp",
        "/images/portfolio/monthly-sales-reports/rep-channel.webp",
      ],
    },
    {
      id: "sales-hq",
      name: "영업본부",
      sources: [],
    },
    {
      id: "support",
      name: "영업지원팀",
      sources: [
        "/images/portfolio/sales-strategy-portal/home.webp",
        "/images/portfolio/sales-strategy-portal/home-donut.webp",
        "/images/portfolio/sales-strategy-portal/home-workflow.webp",
        "/images/portfolio/sales-strategy-portal/orders.webp",
        "/images/portfolio/sales-strategy-portal/credit-query.webp",
        "/images/portfolio/sales-strategy-portal/inventory-lot.webp",
        "/images/portfolio/sales-strategy-portal/accounting.webp",
      ],
    },
    {
      id: "accounting",
      name: "회계팀",
      sources: [
        "/images/portfolio/accounting-ledger/accounting-home.webp",
        "/images/portfolio/accounting-ledger/customer-ledger.webp",
        "/images/portfolio/accounting-ledger/collection-adjustments.webp",
        "/images/portfolio/accounting-ledger/business-status.webp",
      ],
    },
    {
      id: "market",
      name: "시장",
      sources: [
        "/images/portfolio/market-analysis/portfolio.webp",
        "/images/portfolio/market-analysis/competition.webp",
        "/images/portfolio/market-analysis/national.webp",
      ],
    },
    {
      id: "sfe",
      name: "SFE",
      sources: [
        "/images/portfolio/sales-hq-sfe/effort-value-quadrant.webp",
        "/images/portfolio/sales-hq-sfe/summary.webp",
        "/images/portfolio/sales-hq-sfe/grade-targeting.webp",
        "/images/portfolio/sales-hq-sfe/visit-productivity.webp",
        "/images/portfolio/sales-hq-sfe/metric-guide.webp",
      ],
    },
    {
      id: "snop",
      name: "S&OP",
      sources: [
        "/images/portfolio/sales-hq-snop/monthly-overview.webp",
        "/images/portfolio/sales-hq-snop/demand-review.webp",
        "/images/portfolio/sales-hq-snop/supply-inventory.webp",
        "/images/portfolio/sales-hq-snop/forecast-lab.webp",
        "/images/portfolio/sales-hq-snop/finance-reconcile.webp",
        "/images/portfolio/sales-hq-snop/data-close.webp",
      ],
    },
    {
      id: "kpis",
      name: "KPIS",
      sources: [
        "/images/portfolio/kpis-dsr-api/report-flow.webp",
        "/images/portfolio/kpis-dsr-api/order-check.webp",
        "/images/portfolio/kpis-dsr-api/kpis-home.webp",
        "/images/portfolio/kpis-dsr-api/report-work.webp",
        "/images/portfolio/kpis-dsr-api/supply-lines.webp",
      ],
    },
    {
      id: "raw",
      name: "원본 자료",
      sources: [],
    },
    {
      id: "admin",
      name: "관리자 설정",
      sources: ["/images/portfolio/pharmkpi/data-architecture.webp"],
    },
  ],
  "pharmkpi-exec": [
    {
      id: "daily",
      name: "데일리 리포트",
      sources: ["/images/portfolio/pharmkpi-exec/bin-daily.webp"],
    },
    {
      id: "composition",
      name: "판매 구성",
      sources: [
        "/images/portfolio/pharmkpi-exec/bin-composition-business.webp",
        "/images/portfolio/pharmkpi-exec/bin-composition-product.webp",
        "/images/portfolio/pharmkpi-exec/bin-composition-production.webp",
      ],
    },
    {
      id: "detail",
      name: "상세 조회",
      sources: [
        "/images/portfolio/pharmkpi-exec/bin-sales-detail.webp",
        "/images/portfolio/pharmkpi-exec/bin-item-detail.webp",
        "/images/portfolio/pharmkpi-exec/bin-collection-detail.webp",
        "/images/portfolio/pharmkpi-exec/bin-receivables-detail.webp",
      ],
    },
  ],
} as const;
