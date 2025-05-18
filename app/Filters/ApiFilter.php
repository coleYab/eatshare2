<?php

namespace App\Filters;

use Illuminate\Http\Request;

class ApiFilter {
    public function transform(Request $request) {
        $eloQry = [];

        // [['property', 'operator', 'value']]

        foreach ($this->safeParams as $param => $operators) {
            $qry = $request->query($param);

            if (empty($qry)) {
                continue;
            }

            $col = $this->columnMap[$param] ?? $param;
            foreach ($operators as $operator) {
                if (isset($qry[$operator])) {
                    $eloQry[] = [$col, $this->operatorMap[$operator], $qry[$operator]];
                }
            }
        }

        return $eloQry;
    }
}

?>
