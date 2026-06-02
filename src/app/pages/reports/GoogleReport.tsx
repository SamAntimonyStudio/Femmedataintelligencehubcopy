import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const performanceData = [
  { month: "Oct", impressions: 284000, clicks: 12400, conversions: 380, spend: 8240 },
  { month: "Nov", impressions: 312000, clicks: 14200, conversions: 420, spend: 9120 },
  { month: "Dec", impressions: 298000, clicks: 13600, conversions: 410, spend: 8840 },
  { month: "Jan", impressions: 326000, clicks: 15800, conversions: 480, spend: 10240 },
  { month: "Feb", impressions: 342000, clicks: 16400, conversions: 520, spend: 10680 },
  { month: "Mar", impressions: 368000, clicks: 17600, conversions: 560, spend: 11420 },
];

export default function GoogleReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Google Marketing"
        title="Google Ads Performance Report"
        description="Comprehensive Google Ads performance analysis across Shopping, Search, Display, and Performance Max campaigns. Monthly benchmarks and year-over-year comparison."
        backgroundGradient="terra"
        stats={[
          { label: "Total Spend (6M)", value: "$58.5K" },
          { label: "Avg ROAS", value: "4.8x" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Total Spend"
            value="$58,540"
            change="+12.4%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Total Revenue"
            value="$281,280"
            change="+18.6%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="ROAS"
            value="4.8x"
            change="+0.6x"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Conversions"
            value="2,770"
            change="+22.4%"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Performance Insight"
          content="Google Shopping campaigns are your top performer with 5.2x ROAS. Performance Max campaigns show strong momentum (+32% conversions MoM). Recommendation: reallocate 15% of Display budget to Performance Max, and test Dynamic Search Ads for long-tail keywords."
        />

        <div className="grid grid-cols-2 gap-6">
          <ChartContainer
            title="6-Month Performance Trend"
            subtitle="Impressions and clicks over time"
            tag={{ label: "Google Ads", variant: "terra" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid key="grid-google-trend" strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis key="xaxis-google-trend" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <YAxis key="yaxis-google-trend" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <Tooltip
                  key="tooltip-google-trend"
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px'
                  }}
                />
                <Legend key="legend-google-trend" wrapperStyle={{ fontSize: '12px' }} />
                <Line key="line-impressions" type="monotone" dataKey="impressions" stroke="var(--terra)" strokeWidth={3} name="Impressions" />
                <Line key="line-clicks" type="monotone" dataKey="clicks" stroke="var(--green)" strokeWidth={3} name="Clicks" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer
            title="Monthly Spend vs Revenue"
            subtitle="6-month comparison"
            tag={{ label: "ROI Analysis", variant: "green" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid key="grid-google-spend" strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis key="xaxis-google-spend" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <YAxis key="yaxis-google-spend" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <Tooltip
                  key="tooltip-google-spend"
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px'
                  }}
                />
                <Legend key="legend-google-spend" wrapperStyle={{ fontSize: '12px' }} />
                <Bar key="bar-spend" dataKey="spend" fill="var(--terra)" name="Spend ($)" radius={[8, 8, 0, 0]} />
                <Bar key="bar-conversions" dataKey="conversions" fill="var(--green)" name="Conversions" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <Card>
          <CardTitle>Campaign Type Performance</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">6-month aggregate by campaign type</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Campaign Type</th>
                  <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Spend</th>
                  <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Revenue</th>
                  <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>ROAS</th>
                  <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Conv.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">Google Shopping</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$18,420</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$95,784</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>5.2x</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">1,124</td>
                </tr>
                <tr className="border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">Performance Max</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$22,640</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$113,200</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>5.0x</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">982</td>
                </tr>
                <tr className="border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">Search</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$12,840</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$55,248</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>4.3x</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">486</td>
                </tr>
                <tr className="hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">Display</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$4,640</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">$17,048</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>3.7x</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">178</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
