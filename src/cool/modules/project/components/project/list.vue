<template>
  <div class="project-list">
    <div class="__header">
      <span>工程列表</span>
    </div>
    <div class="__body">
      <ul class="project-ul">
        <li v-for="(item, i) in list" :key="i">
          <el-card class="project-card" shadow="hover">
            <template #header>
              <div class="card_title">
                <span>{{ item.name }}</span>
                <!-- <div class="opator"> -->
                  <el-button type="text" style="float: right; padding: 3px 0;">详细</el-button>
                <!-- </div> -->
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="card_body">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
	props: {
		list: {
			type: Array,
			default() {
				return [
          { name: "test" },
          { name: "test2" }
        ]
			}
		}
	},
	setup() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.project-list {
  padding: 1rem;
  background-color: white;
  border-radius: 5px;

  .project-ul {
    list-style: none;

    > li {
      margin: 1rem;

      .card_title::before,
      .card_title::after {
        display: table;
        content: "";
      }
      .card_title::after {
        clear: both;
      }
      
      .card_body {
        font-size: 14px;
        margin-bottom: 18px;
      }
    }
  }
}
</style>