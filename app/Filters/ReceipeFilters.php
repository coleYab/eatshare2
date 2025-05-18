<?php

namespace App\Filters;

use Illuminate\Http\Request;
// use App\Filters\ApiFilter;

class ReceipeFilters extends ApiFilter {
    protected $safeParams = [
        'preparation_time' => ['gt', 'lt', 'eq'],
        "cooking_time" => ['gt', 'lt', 'eq'],
        "serving" => ['gt', 'lt', 'eq'],
        "difficulty" => ['eq'],
    ];

    protected $columnMap = [
        // 'customerId' => 'customer_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lte' => '>=',
        'gte' => '<=',
        'gt' => '>',
        'lt' => '<',
    ];
}
?>
