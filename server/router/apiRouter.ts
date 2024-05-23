import express, { request } from "express";
import { IProduct } from "../modals/IProduct";
import ProductTable from "../modals/Product";
import { error, info } from "console";


const apiRouter: express.Router = express.Router();
//logic
/*  @usage : GET All Products
   @url : http://127.0.0.1:5000/api/products
   @method : GET 
   @fields : no-fields 
   @access : PUBLIC*/
apiRouter.get( '/products', async( request: express.Request, response: express.Response ) =>
{
    try
    {
        let products: IProduct[] = await ProductTable.find();
        response.status( 200 ).json( {
            msg: "All Products found",
            products:products
        } );
    }
    catch ( error )
    {
        console.error( error );
        response.status( 500 ).json( {
            msg: "All Products Found"
        })
    }
})

/* @usage : GET single Product 
   @url : http://127.0.0.1:5000/api/products/:productId
   @method : GET 
   @fields : no-fields 
   @access : PUBLIC */
apiRouter.get( '/products/:productId', async( request: express.Request, response: express.Response ) =>
{
    let productId: string = request.params.productId;
    try
    {
        
        if ( productId )
        {
            let product: IProduct | null = await ProductTable.findById( productId );
            response.status( 200 ).json( {
                msg: "Product Found",
                product:product
            })
        }
        
    }
    catch ( error )
    {
        return response.status( 200 ).json( {
            msg:error
        })
    }
})

/*@usage : CREATE a Product 
   @url : http://127.0.0.1:5000/api/products/
   @method : POST 
   @fields : name , image , price , qty , info 
   @access : PUBLIC */
apiRouter.post( '/products', async( request: express.Request, response: express.Response ) =>
{
    try
    {
        let { name,image,price,qty,info}= request.body//receive data from form using request.body
        //check if product already exists
        let product: IProduct | null = await ProductTable.findOne( { name: name } );
        if ( product )
        {
            return response.status( 401 ).json( {
                error: [
                    {msg:'Product already exists'}
                ]
            });
        }
        //else save the new product
        product = new ProductTable( { name:name, image:image, price:price, qty:qty, info:info } );
        product = await product.save();
        response.status( 200 ).json( {
            msg: "Product Created Successfully"
        } );
    }
    catch ( error )
    {
        console.error( error );
        response.status( 500 ).json( {
            msg:error
        })
    };
} )

/*@usage : UPDATE a Product 
   @url : http://127.0.0.1:5000/api/products/:productId
   @method : PUT 
   @fields : name , image , price , qty , info 
   @access : PUBLIC */ 
apiRouter.put( '/products/:productId', async ( request: express.Request, response: express.Response ) =>
{
    let productId: string = request.params.productId;
    let { name, qty, image, price, info } = request.body;
    let product: IProduct | null = await ProductTable.findById(  productId );
    try
    {
        if ( !product )
        {
            return response.status( 401 ).json( {
                error: [
                    {msg:'Product does not exists'}
                ]
            });
        }
        
            //update the product
            product = await ProductTable.findByIdAndUpdate( productId , {
                name: name, image: image, price: price, qty: qty, info: info
            }, { new: true } );
            response.status( 200 ).json( {
                msg: "Product Updated Successfully"
            } );

        }
     catch ( error )
        {
            console.error( error );
        response.status( 500 ).json( {
            errors: [
                { msg: error }
            ]
            } );
        }
     } );

/*usage : DELETE a Product 
   @url : http://127.0.0.1:5000/api/products/:productId
   @method : DELETE 
   @fields : no-fields 
   @access : PUBLIC  
    */
   apiRouter.delete( '/products/:productId', async( request: express.Request, response: express.Response ) =>
{
       try
       {
           let productId: string = request.params.productId;
        if ( !productId )
        {
            return response.status( 401 ).json( {
                errors:[{
                msg: "Product does not exists"}]
            })
        }      
           let product: IProduct | null = await ProductTable.findByIdAndDelete( productId )
           response.status( 200 ).json( {
               msg: "Product deleted Successfully",
               productID:product?._id
           })
           
       }
       catch ( error )
    {
        return response.status( 200 ).json( {
            msg:error
        })
    }
})

export default apiRouter;