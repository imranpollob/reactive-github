import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { RepoInsights } from '../../utils/githubStats';
import './languages.css';

const COLORS = ['#2563eb', '#7c3aed', '#0ea5e9', '#9333ea', '#22c55e', '#f97316', '#14b8a6', '#facc15'];

interface LanguageSnapshotProps {
  insights: Pick<RepoInsights, 'languages' | 'primaryLanguage' | 'diversity'>;
}

const LanguageSnapshot = ({ insights }: LanguageSnapshotProps) => {
  const hasLanguages = insights.languages.length > 0;

  return (
    <section className="languages card">
      <div className="languages__header">
        <h3>Language Snapshot</h3>
        <p className="hint-text">Primary language and diversity across repositories.</p>
      </div>

      {hasLanguages ? (
        <div className="languages__content">
          <div className="chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={insights.languages}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {insights.languages.map((entry, index) => (
                    <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} repos`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="languages__legend">
            <div className="summary">
              <div>
                <span className="summary__label">Primary language</span>
                <span className="summary__value">{insights.primaryLanguage ?? '—'}</span>
              </div>
              <div>
                <span className="summary__label">Language diversity</span>
                <span className="summary__value">
                  {insights.diversity}{' '}
                  {insights.diversity === 1 ? 'language' : 'languages'}
                </span>
              </div>
            </div>
            <ul>
              {insights.languages.map((language, index) => (
                <li key={language.label}>
                  <span
                    className="color"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{language.label}</span>
                  <span className="count">{language.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="hint-text">No primary language data available.</p>
      )}
    </section>
  );
};

export default LanguageSnapshot;
