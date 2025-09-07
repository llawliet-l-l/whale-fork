import type { Category, FileName, UseCSSVariablesResult } from './types.js';

import { useEffect, useState } from 'react';

import { filterVariablesByPrefix, loadCSSVariables } from './css-parser.js';

function useCSSVariables(
  category: Category,
  fileName: FileName,
  prefix?: string,
): UseCSSVariablesResult {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadVariables() {
      try {
        setLoading(true);
        setError(null);

        const allVariables = loadCSSVariables(category, fileName);

        if (prefix) {
          const filteredVariables = filterVariablesByPrefix(
            allVariables,
            prefix,
          );
          setVariables(filteredVariables);
        } else {
          setVariables(allVariables);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load design tokens',
        );
      } finally {
        setLoading(false);
      }
    }

    loadVariables();
  }, [category, fileName, prefix]);

  return { variables, loading, error };
}

export { useCSSVariables };
