import React, { Component } from 'react';
import {  Table, Button, InputNumber, Checkbox, message, Popconfirm} from 'antd';
import { Link } from 'react-router-dom'
import * as moment from "moment"
import $ from 'jquery';
import styles from "./ShoppingCart.less";

const CheckboxGroup = Checkbox.Group;

class ShoppingCart extends Component {

    constructor(props) {
        super(props);

      this.state = {
        dataSource: [],
        pagination: {},
        checkList: [],
        checkNumber: 0,
        total: 0.0
      }
    }
    
    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.props.changTablePagination(pager)
    }

    componentWillReceiveProps(next) {      
      this.setState({
        pagination: next.pagination,
        dataSource: next.shoppingList
      });
    }

    handleCheckBox = (index, e) => {
        let params = this.state.checkList
        if (e) {
            params.push(index)
            
        }
        if (!e) {
            params.pop(index)
        }
        let total = 0.0
        params.map((id) => {
            this.state.dataSource.map( (shoppingList) => {
                console.log(shoppingList)
                if (id == shoppingList.id) {
                    total += shoppingList.sum
                }
            })
        })
        this.setState({
            checkList: params,
            checkNumber: params.length,
            total: total
        })
    }

    changeGoodsNumber = (id, value) => {
        this.props.changeGoodsNumber(id, value)
    }

    handleDelete = (id) => {
        this.props.delete(id)
    }

    submit = () => {
        if (this.state.checkList.length == 0 ) {
            message.error("Please select goods!")
            return;
        }

        this.props.submit(this.state.checkList)
    }

    clearCart = () => {
        this.props.clearCart()
    }

    render() {
        if ($.isEmptyObject(this.state.dataSource)) {
            return <div className={styles.cart_is_null}>
                cart is null
            </div>
        }

        const columns = [
            {
                key: "checkbox",
                width: "10%",
                render: (text, record, index) => {
                    return (
                       <CheckboxRecord id={text.id} handleCheckBoxClick={this.handleCheckBox}/>
                    )
                }
            }
            ,
            {
                key: 'imgs',
                width: "10%",
                render: (text, record, index) => (
                  text.goods.imgs.length != 0? <img className={styles.img} src={text.goods.imgs[0].name} /> : "no img"       
                ),
            }
            , 
            {
                title: "name",
                key: "goods name",
                render: (text) => {
                    return (
                        <span>{text.goods.name}</span>
                    )
                }
            }
            ,
            {
                title: "number",
                key: "goods number",
                width: "10%",
                render: (text, record, index) => {
                    return (
                        <GoodsNumber id={text.id} goodsNumber={text.number} changeNumber={this.changeGoodsNumber}/>
                    )
                }
            }
            ,
            {
                title: "sum",
                key: "sum",
                dataIndex: "sum",
                width: "10%",
            }
            ,
            {
                title: 'Action',
                key: 'action',
                width: "20%",
                render: (text, record, index) => (
                  <span>
                        <Popconfirm title="Are you sure delete this goods?" onConfirm={() => this.handleDelete(text.id)} okText="Yes" cancelText="No">
                            <Button type="primary" >Delete</Button>
                        </Popconfirm>
                  </span>
                ),
              }
        ]
      
      return (
        <div>
            <Table 
              dataSource={this.state.dataSource} 
              columns={columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            />
            <div className={styles.confirm_contrainer}>
                <span>
                    <Button type="primary" onClick={this.clearCart}>clear cart</Button>
                </span>
                <span className={styles.selected_items}>
                    selected items number:
                    <span className={styles.selected_number}>{this.state.checkNumber}</span>
                    item
                </span>
                <span className={styles.selected_items_total}>
                    selected items total:
                    <span className={styles.selected_number}>{this.state.total}</span>
                    RMB
                </span>
                <div className={styles.confirm_button}>
                    <Button type="primary" onClick={this.submit}>settlement</Button>
                </div>
            </div>
        </div>
      );
    }
}   

export default ShoppingCart;


export class CheckboxRecord extends Component {

    constructor(props) {
        super(props)
    }

    handleCheckBoxClick = (e) => {
        this.props.handleCheckBoxClick(this.props.id, e.target.checked)
    }

    render() {
        return (
             <Checkbox onChange={this.handleCheckBox} onClick={this.handleCheckBoxClick}>{this.props.id}</Checkbox>
        )
    }
}

export class GoodsNumber extends Component {

    constructor(props) {
        super(props)
    }

    onChange =  (e) => {
        this.props.changeNumber(this.props.id, e)
    }

    render() {

        return (
            <InputNumber size="small" min={1} max={100000} defaultValue={this.props.goodsNumber} onChange={this.onChange} />
        )
    }
}
