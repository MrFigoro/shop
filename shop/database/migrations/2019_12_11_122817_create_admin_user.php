<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminUser extends Migration
{
    protected $adminEmail = 'admin@mailforspam.com';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('insert into `users` (`name`, `email`, `password`, `role`) values("admin", "'.$this->adminEmail
            .'", "'.Hash::make('hand1234').'", "admin")');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("delete from `users` where `email` = '{$this->adminEmail}'");
    }
}
