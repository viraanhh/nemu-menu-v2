<?php

namespace App\Helpers;

class OracleHelper
{
    /**
     * Convert binary data to a format suitable for Oracle BLOB
     */
    public static function prepareBlob($data)
    {
        return $data ? $data : null;
    }

    /**
     * Extract binary data from Oracle BLOB for use in application
     */
    public static function extractBlob($blob)
    {
        return $blob ? $blob : null;
    }
}
