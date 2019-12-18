<?php

if (! function_exists('getPaginatePerPage')) {
    function getPaginatePerPage(): int
    {
        $paginatePerPage = intval(env('PAGINATE_PER_PAGE', '15'));

        return $paginatePerPage;
    }
}