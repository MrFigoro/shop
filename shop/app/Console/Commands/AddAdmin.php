<?php

namespace App\Console\Commands;

use App\System\Models\User;
use Illuminate\Console\Command;

class AddAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creating admin user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $user = new User();
        $name = $this->ask('Enter your name please:');
        $email = $this->ask('Enter email for admin please:');
        //тут было бы неплохо организовать проверку на ввод существующего email User::find($userData['id'])
        //Реализовать через Request
        $password = $this->secret('Enter password for admin please:');
        $user->name = $name;
        $user->password = $password;
        $user->email = $email;
        $user->role = "Admin";
        $user->save();
        $this->info('Admin added successful!');
    }
}
