<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ShippingAddress;
use App\Models\CustomerOrder;
use App\Models\OrderDetail;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Import;
use App\Models\ImportDetail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use SebastianBergmann\Environment\Console;
use Exception;
use Hash;
use Mail;        
use Illuminate\Support\Facades\DB;
use App\Mail\OrderSuccess;
use App\Mail\CancelOrder;
use App\Mail\ConfirmSuccess;
use App\Mail\Delivered;
use App\Mail\Delivering;
use App\Models\Category;
use App\Models\Image;
use App\Models\Provider;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function adminDashboard(Request $request){

        $alladmin = User::all();
        $admin = User::where('role','admin')->get();
        $allcustomer = Customer::all();
        $customer_block = Customer::where('status',0)->get();

        $product = Product::all();
        $provider = Provider::all();
        $imports = Import::all();
        $category = Category::all();
        
        $all_customer_order = CustomerOrder::all();
        $WaitForConfirmation = CustomerOrder::whereNull('confirm_time')->where('order_status',1)->get();
        $WaitingForShipping = CustomerOrder::whereNull('ship_time')->whereNotNull('confirm_time')->where('order_status',1)->get(); 
        $Delivering = CustomerOrder::whereNull('completed_time')->whereNotNull('ship_time')->where('order_status',1)->get();
        $OrderDelivered = CustomerOrder::whereNotNull('completed_time')->where('order_status',1)->get();
        $OrderCancel = CustomerOrder::where('order_status',0)->get();

        $infor_dashboard['alladmin'] = count($alladmin);
        $infor_dashboard['admin'] = count($admin);
        $infor_dashboard['allcustomer'] = count($allcustomer);
        $infor_dashboard['customer_block'] = count($customer_block);
        $infor_dashboard['product'] = count($product);
        $infor_dashboard['provider'] = count($provider);
        $infor_dashboard['imports'] = count($imports);
        $infor_dashboard['category'] = count($category);
        $infor_dashboard['all_customer_order'] = count($all_customer_order);
        $infor_dashboard['WaitForConfirmation'] = count($WaitForConfirmation);
        $infor_dashboard['WaitingForShipping'] = count($WaitingForShipping);
        $infor_dashboard['Delivering'] = count($Delivering);
        $infor_dashboard['OrderDelivered'] = count($OrderDelivered);
        $infor_dashboard['OrderCancel'] = count($OrderCancel);
        
        // alladmin,admin,... s??? chuy???n th??nh key c???a array infor_dashboard
        // sau khi response json th?? array n??y chuy???n th??nh object v?? c??c key s??? chuy???n th??nh property t????ng ???ng 

        return response()->json([
            'infor_dashboard' => $infor_dashboard
        ],201);
    }
}
/*
    Trong khi code th?? vs code n?? c?? th??? t??? code th??m cho ta m???t s??? c??i v?? d??? nh?? 
    ta $category = Cate] = th?? n?? t??? hi???u l?? ta mu???n $category = Category::...] = n?? s??? t??? use Model Category cho ta 
*/
