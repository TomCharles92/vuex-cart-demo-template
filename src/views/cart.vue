<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartProducts"
      style="width: 100%"
    >
      <el-table-column
        width="55">
        <template v-slot:header>
          <el-checkbox v-model="checkAll" size="mini"></el-checkbox>
        </template>
        <!--
          @change="updateProductChecked"  默认参数：更新后的值
          @change="updateProductChecked(productId, $event)"  123, 原来那个默认参数
            当你传递了自定义参数的时候，还想得到原来那个默认参数，就手动传递一个 $event
         -->
        <template v-slot="scope">
          <el-checkbox
            size="mini"
            :value="scope.row.isChecked"
            @change="updateProductChecked({ id: scope.row.id, isChecked: $event})"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
        <template v-slot="scope">
          <!-- updateProductCount -->
          <!-- action 未使用 mutation，所以不会使用插件 localStorage -->
          <el-input-number :value="scope.row.count" @change="asyncUpdateProductCount({
            id: scope.row.id,
            count: $event
          })" size="mini"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="小计">
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="deleteProd(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>已选 <span>{{ totalCount }}</span> 件商品，总价：<span>{{ totalPrice }}</span></p>
      <el-button type="danger">结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {}
  },
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['totalCount', 'totalPrice']),
    checkAll: {
      get () {
        return this.cartProducts.every(prod => prod.isChecked)
      },
      set (value) {
        this.updateAllProductChecked(value)
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['deleteProd', 'updateAllProductChecked', 'updateProductChecked', 'updateProductCount']),
    ...mapActions('cart', ['asyncUpdateProductCount'])
  }
}
</script>

<style></style>
